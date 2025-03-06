import { Task, MetaData } from "../../types/models";

export interface IssueStateBase {
    key: string;
    todo: Task[];
    inProgress: Task[];
    done: Task[];
    metaDataRepo: MetaData[];
}