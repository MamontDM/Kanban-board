
export interface Task {
    id: number;
    title: string;
    number: number;
    state: "todo" | "inProgress" | "done";
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
    assignee: null | Assignee;  
    body : null | string;
    comments: number;
    ownerUser: string;
    repoUrl: string;
    order: number;
  }
interface Assignee {
  login: string;
  htmlUrl: string;
  avatarUrl: string;
}

export interface IssueApi {
  id: number;
  title: string;
  number: number;
  state: string;
  created_at: string;
  updated_at: string;
  closedAt: string | null;
  assignee: AssigneeApi | null;  
  body : null | string;
  comments: number;
  user: IssueAuthorApi;
  repository_url: string;
}

interface IssueAuthorApi {
  login: string;
}
interface AssigneeApi {
  login: string;
  html_url: string;
  avatar_url: string;
}


export interface RepoData {
  owner: {
   login: string | null,
   html_url: string | null,
  } | null;
  name: string | null,
  stargazers_count: number | null,
  html_url: string | null,
 }

 export interface MetaData {
   userName: string,
   repoName: string,
   userGit: string,
   gitStars: number,
   htmlUrl: string,
 }