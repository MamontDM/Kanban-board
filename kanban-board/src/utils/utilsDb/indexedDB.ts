import { Task } from "../../types/models";
import { MetaData } from "../../types/models";

export const openDB =  (): Promise<IDBDatabase>  =>  {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("kanbanDB", 1);
    
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains("issues")) {
            db.createObjectStore("issues");
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    };
    
  export const saveIssuesDB = async (
    repoKey : string, 
    issues : {todo: Task[], inProgress: Task[], done: Task[],}, 
    repo : MetaData[],
    ) => {
      try {
        const db = await openDB();
        const tx = db.transaction("issues", "readwrite");
        const store = tx.objectStore("issues");
        
        if (!issues) {
          console.error("Invalid issues format:", issues);
          return;
          }
            store.put({ 
              key: repoKey,
              todo: issues.todo ?? [],
              inProgress: issues.inProgress ?? [],
              done: issues.done ?? [],
              repo: repo ?? ({} as MetaData),
            }, 
            repoKey
          );
            await new Promise<void>((resolve, reject) => {
              tx.oncomplete = () => resolve();
              tx.onerror = () => reject(tx.error);
            });  
        } catch (error) {
            console.error("Error saving to IndexedDB:", error);
        }
    };

  export const getIssues = async (repoKey: string): Promise<{
    key: string,
    todo: Task[],
    inProgress: Task[],
    done: Task[], 
    repo: MetaData[],
  }> => {
      try {
        const db = await openDB();
        const tx = db.transaction("issues", "readonly");
        const store = tx.objectStore("issues");
          
        return new Promise((resolve, reject) => {
          const request = store.get(repoKey);
            request.onsuccess = () => {
              if(request.result ) {
                console.log(`Loaded issues for repo ${repoKey} from IndexedDB:`, request.result);
                resolve(request.result);
              }else {
                console.log(`No issues found for repo ${repoKey}.`);
                  resolve({
                    key: "",
                    todo: [],
                    inProgress: [],
                    done: [],
                    repo: [],
                  }); 
                }
              };
            request.onerror = () => reject(request.error);
          });
      }catch (error) {
          console.error("Error reading from IndexedDB", error);
            return {
            key: "",
            todo: [],
            inProgress: [],
            done: [],
            repo: [],
          };
        }
      };

  export const getTrackedRepo = async (): Promise<string[]> => {
    try {
      const db = await openDB();
      const tx = db.transaction("issues", "readonly");
      const store = tx.objectStore("issues");

      return new Promise((resolve, reject) => {
        const request = store.getAllKeys();
        request.onsuccess = () => {
          resolve(request.result as string[])};
        request.onerror = () => {
          reject(request.error)};
      });
    } catch (error) {
      console.error("Error loading repos from IndexedDB", error);
      return [];
    }    
  };
