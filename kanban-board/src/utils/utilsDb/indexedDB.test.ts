import "fake-indexeddb/auto";
import { describe, it, expect, beforeEach } from "vitest";
import { openDB, saveIssuesDB, getIssues, getTrackedRepo } from "./indexedDB";
import { MetaData, Task } from "types/models";



beforeEach( async () => {
    const db = await openDB();
    db.close();
    indexedDB.deleteDatabase("kanbanDB");
});

describe("IndexedDB - saveIssuesDB", () => {
    it("save issues to indexedDB", async () => {
        const repoKey = "repo-1";
        const issues: { todo: Task[], inProgress: Task[], done: Task[] } = {
            todo: [],
            inProgress: [],
            done: [],
          };
        const repo: MetaData[] = [];
        await saveIssuesDB(repoKey, issues, repo);

        const storedData = await getIssues(repoKey);
        
        expect(storedData).toEqual({
            key: repoKey,
            todo: [],
            inProgress: [],
            done: [],
            repo: [],
            });
    });

    it("should return default data if repoKey does not exist", async () => {
        const storedData = await getIssues("non-existent-repo");
    
        expect(storedData).toEqual({
          key: "",
          todo: [],
          inProgress: [],
          done: [],
          repo: [],
        });
      });

      
      it("should return all repo keys", async () => {
        await saveIssuesDB("repo-1", { todo: [], inProgress: [], done: [] }, []);
        await saveIssuesDB("repo-2", { todo: [], inProgress: [], done: [] }, []);
    
        const keys = await getTrackedRepo();
        expect(keys).toContain("repo-1");
        expect(keys).toContain("repo-2");
      });
});