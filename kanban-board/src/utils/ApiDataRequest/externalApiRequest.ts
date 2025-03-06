import { saveIssuesDB } from "../utilsDb/indexedDB";
import { useRepoStore } from "../../store/repoStore";
import  processIssues  from "../ApiDataProcessed/processedIssuesData";
import processMetaData from "../ApiDataProcessed/processedRepoData";
import { RepoData } from "../../types/models";

export interface RepoDataKey {
  ownerName: string;
  repository: string,
}

export const useSourceDataManager = async (repoData: RepoDataKey): Promise<void> => {
  const loadRepository = useRepoStore.getState().loadRepos;

  const {ownerName, repository} = repoData;
  const repoKey : string = `${ownerName}-${repository}`;

  if(!ownerName || !repository){
    console.error("Invalid repo data:", repoData);
    return 
}
  const headers = {
    headers: {
        Accept: 'application/vnd.github.v3+json'
    },
};

try {
  const [issuesRes, repoRes] = await Promise.allSettled([
    fetch(`https://api.github.com/repos/${ownerName}/${repository}/issues?state=all`, headers),
    fetch(`https://api.github.com/repos/${ownerName}/${repository}`, headers),
  ]);

  const issues = issuesRes.status === "fulfilled" ? await issuesRes.value.json() : [];
  const repoInfoRawFile = repoRes.status === "fulfilled" ? await repoRes.value.json() : null; 

 
  const repoInfo: RepoData[] = Array.isArray(repoInfoRawFile) ? repoInfoRawFile : [repoInfoRawFile];


  const processedIssues = processIssues(issues);
  const processedRepoInfo = processMetaData(repoInfo);


  await saveIssuesDB(repoKey, processedIssues, processedRepoInfo);

  loadRepository(repoKey);

  }catch (error) {
    console.error("Error fetching data:", error);
  }
};