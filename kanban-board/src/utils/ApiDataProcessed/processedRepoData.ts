import { RepoData } from "../../types/models";
import { MetaData } from "../../types/models";

const processMetaData = (currentRepoData : RepoData[] | null | undefined) :  MetaData[] => {

  if (!Array.isArray(currentRepoData)) {
    console.warn("Return empty array - metaData null or undefined");
    return [{
        userName: "Unknown",
        repoName: "Unknown Repo",
        userGit: "#",
        gitStars: 0,
        htmlUrl: "#",
      }
    ];
  }
    return currentRepoData.map(data => ({
      userName: data.owner?.login ?? "Unknown",
      repoName: data.name ?? "Unknow repo",
      userGit:  data.owner?.html_url ?? "#",
      gitStars: data.stargazers_count ?? 0,
      htmlUrl:  data.html_url ?? "#",
    }));
  };

  

  export default processMetaData;