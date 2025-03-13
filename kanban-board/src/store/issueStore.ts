import { create } from "zustand";
import { getIssues } from "../utils/utilsDb/indexedDB";
import { Task, MetaData } from "../types/models";
import { IssueStoreState } from "./types";
import { IssueState } from "./types";

export const useIssueStore = create<IssueStoreState>((set, get) => ({
  key: "", 
  todo: [],
  inProgress: [],
  done: [],
  metaDataRepo: [],
  isLoaded: false,
  
  loadIssuesFromDB: async (repoKey: string) => {
    if (!repoKey) return;
    try {
     const cachedIssues = await getIssues(repoKey);
      if(cachedIssues) {
        set({
          key: cachedIssues.key,
          todo: cachedIssues.todo as Task[],
          inProgress: cachedIssues.inProgress as Task[],
          done: cachedIssues.done as Task[],
          metaDataRepo: cachedIssues.repo as MetaData[],
          isLoaded: true,
        });
      } else {
        console.log("No issues found in IndexedDB.");
        set({isLoaded: true});
      }
    } catch (error) {
      console.error("Error loading issues from IndexedDB:", error);
      set({isLoaded: true});
    }
  },

  moveIssue: (
    id: number, 
    currentState: IssueState, 
    newState: IssueState, 
    positionBefore: boolean, 
    overTaskId?: number, 
    positionEnd?: boolean
) => set((state) => {

  const issueId = id;

  const sameColumn = currentState === newState;
  const originIssueArr = sameColumn ? state[currentState] : [...state[currentState]];
  const targetIssueArr = sameColumn ? originIssueArr : [...state[newState]];

  const taskIndex = originIssueArr.findIndex((task) => task.id === issueId);
    if (taskIndex === -1) {
      console.error(`Task with id ${id} not found!`);
      return state;
    }

    if(currentState === newState && !overTaskId && !positionEnd){
      console.log("Task dropped in the same position, no update needed.");
            return state;
    }

  const [task] = originIssueArr.splice(taskIndex, 1);
  task.state = newState; 

  let newOrder: number;

  if(overTaskId){
    const overTask = targetIssueArr.find(item => item.id === overTaskId);
    if(!overTask) {
        console.warn(`OverTaskId ${overTaskId} not found, inserting at end.`);
        newOrder = targetIssueArr.length ? targetIssueArr[targetIssueArr.length - 1].order +1 : 1;
    }else {
        newOrder = overTask.order;
        if(positionBefore) {
          targetIssueArr.forEach(item => {
            if(item.order >= newOrder) item.order += 1;
          });
        }else {
          targetIssueArr.forEach(item => {
            if(item.order > newOrder) item.order += 1;
        });
        newOrder += 1;
    }
  }
  }else {
     newOrder = positionEnd 
     ? targetIssueArr.length ? targetIssueArr[targetIssueArr.length - 1].order + 1 : 1
     : targetIssueArr.length ? targetIssueArr[0].order - 1 : 1;
  }

  task.order = newOrder;
    targetIssueArr.push(task);

    targetIssueArr.sort((a, b) => a.order - b.order);
    targetIssueArr.forEach((item, index) => (item.order = index + 1));


      return {
          ...state,
          [currentState]: originIssueArr,
          [newState]: targetIssueArr,
      };
    }),
}));