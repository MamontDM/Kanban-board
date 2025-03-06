import { Task, MetaData } from "../types/models";


export interface  IssueStoreState {
  key: string,
  todo: Task[];
  inProgress: Task[];
  done: Task[];
  metaDataRepo: MetaData[];
  isLoaded: boolean;
  loadIssuesFromDB: (repoKey: string) => Promise<void>;
  moveIssue: (id: number, currentState: IssueState, newState: IssueState, positionBefore: boolean, overTaskId?: number, positionEnd?: boolean) => void;
}
export type IssueState = "todo" | "inProgress" | "done";

export  interface RepoStoreState {
    repos: {id: string }[];
    activeRepoKey: string | null;
    loadRepos : ( repoKey? : string | null) => Promise<void>;
    setActiveRepo: (repoKey: string) => void;
}