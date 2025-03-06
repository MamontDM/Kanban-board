import { describe, vi, it, expect, beforeEach } from "vitest";
import { useIssueStore } from "./issueStore";
import { getIssues } from "../utils/utilsDb/indexedDB";
import { Task } from  "../types/models"

vi.mock("../utils/utilsDb/indexedDB", () => ({
    getIssues: vi.fn((repoKey: string) => Promise.resolve({
        key: repoKey,
        todo: [{ id: 1, title: "test", status: "todo" }],
        inProgress: [{ id: 2, title: "In Progress Task", status: "inProgress" }],
        done: [{ id: 3, title: "Done Task", status: "done" }],
        repo: [{ id: "meta-1", name: "Test Repo" }],
    })),
  }));

  const mockTask = (overrides: Partial<Task>): Task => ({
    id: 0,
    title: "",
    number: 0,
    state: "todo",
    createdAt: "",
    updatedAt: "",
    closedAt: null,
    assignee: null,
    body: null,
    comments: 0,
    ownerUser: "",
    repoUrl: "",
    order: 0,
    ...overrides,
  });

 
  

    describe("useIssueStore", () => {
        it("should have an init state", () => {
            const state = useIssueStore.getState();

            expect(state.key).toEqual("");
            expect(state.todo).toEqual([]);
            expect(state.inProgress).toEqual([]);
            expect(state.done).toEqual([]);
            expect(state.metaDataRepo).toEqual([]);
            expect(state.isLoaded).toEqual(false);

        });

        it("loadIssues from DB", async () => {
            await useIssueStore.getState().loadIssuesFromDB("repo-1");

            const state = useIssueStore.getState();
            expect(state.key).toBe("repo-1");
            expect(state.todo).toEqual([{ id: 1, title: "test", status: "todo" }]);
            expect(state.inProgress).toEqual([{ id: 2, title: "In Progress Task", status: "inProgress" }]);
            expect(state.done).toEqual([{ id: 3, title: "Done Task", status: "done" }]);
            expect(state.metaDataRepo).toEqual([{ id: "meta-1", name: "Test Repo" }]);
            expect(state.isLoaded).toBe(true);

        });

    describe("moveIssue test case", () => {

        beforeEach(() => {
            useIssueStore.setState({
                todo: [
                    mockTask({ id: 1, order: 1, state: "todo"}),
                    mockTask({ id: 2, order: 2, state: "todo"})
                ],
                inProgress: [
                    mockTask({ id: 3, order: 1, state: "inProgress" }),
                  ],
                  done: [],
                  key: "repo-1",
                  metaDataRepo: [],
                  isLoaded: false,
            });
        });


        it("should move task from todo to inProgress", () => {
            useIssueStore.getState().moveIssue(1, "todo", "inProgress", false);
            const state = useIssueStore.getState();
            
            expect(state.todo).toHaveLength(1);
            expect(state.inProgress).toHaveLength(2);
            expect(state.inProgress.some(task => task.id === 1)).toBe(true);
        });

        it("should reorder task within the same list", () => {
            useIssueStore.getState().moveIssue(2, "todo", "todo", true, 1);
            const state = useIssueStore.getState();

            expect(state.todo[0].id).toBe(2);
            expect(state.todo[1].id).toBe(1);
        });

        it("should place task at the end when positionEnd is true", () => {
            useIssueStore.getState().moveIssue(1, "todo", "inProgress", false, undefined, true);
            const state = useIssueStore.getState();

            expect(state.inProgress[state.inProgress.length - 1].id).toBe(1);
        });

        it("should move task before overTaskId", () => {
            useIssueStore.getState().moveIssue(1, "todo", "inProgress", true, 3);
            const state = useIssueStore.getState();

            expect(state.inProgress[0].id).toBe(1);
            expect(state.inProgress[1].id).toBe(3);
        });

        it("should log an error when moving a non-existent task", () => {
            const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});
            useIssueStore.getState().moveIssue(99, "todo", "inProgress", false);

            expect(consoleErrorMock).toHaveBeenCalledWith("Task with id 99 not found!");
            consoleErrorMock.mockRestore();
        });
    });
});