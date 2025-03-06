import { describe, vi, it, expect, beforeEach } from "vitest";
import { useRepoStore } from "./repoStore";

vi.mock("../utils/utilsDb/indexedDB", () => ({
    getTrackedRepo: vi.fn(() => Promise.resolve(["repo-test1", "repo-test2"])),
  }));

    describe("useRepoStore", () => {
        it("should have an init state", () => {
            const state = useRepoStore.getState();
            expect(state.repos).toEqual([]);
            expect(state.activeRepoKey).toEqual(null);
        });
        it("Update when activeRepoKey is called", () => {
            const store = useRepoStore.getState();
            store.setActiveRepo("repo-test1");

            expect(useRepoStore.getState().activeRepoKey).toBe("repo-test1");
        });

        it("should load repos from IndexDB and update state", async () => {
            await useRepoStore.getState().loadRepos();

            const state = useRepoStore.getState();
            expect(state.repos).toEqual([ {id: "repo-test1"}, {id: "repo-test2"}]);
            expect(state.activeRepoKey).toBe("repo-test1");
        });

    });