const processMetaData = (currentRepoData : RepoData[]) :  MetaData[] => {
  console.log(currentRepoData);
    return currentRepoData.map(data => ({
      userName: data.owner.login,
      repoName: data.name,
      userGit:  data.owner.html_url,
      gitStars: data.stargazers_count,
      htmlUrl:  data.html_url,
    }));
  };

  export interface RepoData {
   owner: {
    login: string,
    html_url: string,
   };
   name: string,
   stargazers_count: number,
   html_url: string,
  }

  export interface MetaData {
    userName: string,
    repoName: string,
    userGit: string,
    gitStars: number,
    htmlUrl: string,
  }

  export default processMetaData;