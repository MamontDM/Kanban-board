import { create } from "zustand";
import { getIssues } from "../../utilsDB/indexedDB";
import { MetaData } from "../../utilsDB/processedRepoData";
import { Task } from "../../utilsDB/processedIssuesData";



interface IssueStoreState {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
  metaDataRepo: MetaData;
  isLoaded: boolean;
  loadIssuesFromDB: (repoKey: string) => Promise<void>;
  moveIssue: (id: number, currentState: IssueState, newState: IssueState, newOrder: number) => void;
}
type IssueState = "todo" | "inProgress" | "done";

export const useIssueStore = create<IssueStoreState>((set, get) => ({
  todo: [],
  inProgress: [],
  done: [],
  metaDataRepo: {} as MetaData,
  isLoaded: false,
  
  loadIssuesFromDB: async (repoKey: string) => {
    if (!repoKey) return;
    try {
     const cachedIssues = await getIssues(repoKey);
      if(cachedIssues) {
        set({
          todo: cachedIssues.todo as Task[],
          inProgress: cachedIssues.inProgress as Task[],
          done: cachedIssues.done as Task[],
          metaDataRepo: cachedIssues.repo as MetaData,
          isLoaded: true,
        });
      } else {
        console.log("No issues found in IndexedDB.");
        set({ isLoaded: true }); 
      }
    } catch (error) {
      console.error("Error loading issues from IndexedDB:", error);
      set({ isLoaded: true });
    }
  },

  getAllIssues : () => {
    const { todo, inProgress, done } = get();
    return [...todo, ...inProgress, ...done];
  },

  moveIssue : (id : number, currentState: IssueState, newState: IssueState, newOrder: number ) => {
    console.log(id, currentState, newState, newOrder);
    set((state) => {

    let movedIssue: Task | undefined;

    const updatedState: IssueStoreState = {
      ...state,
      todo: [...state.todo],
      inProgress: [...state.inProgress],
      done: [...state.done],
    };

    updatedState[currentState] = updatedState[currentState].filter((issue) => {
      if(issue.id === id) {
        movedIssue = {...issue, state: newState};
      return false;
      }
        return true;
      });

      if(!movedIssue) return state;

      const targetList = updatedState[newState] ?? [];
      targetList.splice(newOrder -1, 0, movedIssue);

      updatedState[newState] = targetList.map((issue, index) => ({
        ...issue,
        order: index + 1,
      }))
          return updatedState;
        });
    },
}));