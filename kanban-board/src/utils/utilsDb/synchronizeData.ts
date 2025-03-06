import { useIssueStore } from "../../store/issueStore";
import { saveIssuesDB } from "./indexedDB";
import { IssueStateBase } from "./type";


export const synchronizeZustandState = () => {
    useIssueStore.subscribe(() => {
        const {key, todo, inProgress, done, metaDataRepo } = useIssueStore.getState() as IssueStateBase;
        console.log("Sync with IndexedDB...", { todo, inProgress, done });
        saveIssuesDB(key, { todo, inProgress, done }, metaDataRepo);
    });
};