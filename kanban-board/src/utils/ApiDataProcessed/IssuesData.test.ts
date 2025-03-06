import { describe, it, expect } from "vitest";
import processIssues from "./processedIssuesData";
import { IssueApi } from "types/models";
import { a } from "vitest/dist/chunks/suite.qtkXWc6R";

describe("processIssues", () => {
    
    it("returns empty arrays when given null", () => {
        const result = processIssues(null);
        expect(result).toEqual({
            todo: [],
            inProgress: [],
            done: [],
        });
    });

    it("correctly processes issues", () =>{
        const mockIssues: IssueApi[] = [
            {
                id: 1,
                title: "Issue 1",
                number: 101,
                state: "open",
                created_at: "2024-01-01",
                updated_at: "2024-01-02",
                closedAt: null,
                assignee: { login: "user1", avatar_url: "avatar1.jpg", html_url: "url1" },
                body: "Issue body",
                comments: 2,
                user: { login: "owner1" },
                repository_url: "repo1",
            },
            {
                id: 2,
                title: "Issue 2",
                number: 102,
                state: "closed",
                created_at: "2024-01-01",
                updated_at: "2024-01-02",
                closedAt: "2024-01-03",
                assignee: null,
                body: "Issue body 2",
                comments: 5,
                user: { login: "owner2" },
                repository_url: "repo2",
              },
        ];
        const result = processIssues(mockIssues);

        expect(result.todo).toHaveLength(0);
        expect(result.inProgress).toHaveLength(1);
        expect(result.done).toHaveLength(1);

        expect(result.inProgress[0]).toMatchObject({
            id: 1,
            title: "Issue 1",
            state: "inProgress",
        });
        expect(result.done[0]).toMatchObject({
            id: 2,
            title: "Issue 2",
            state: "done",
        });
    });
        
        it("orders issues correctly within each state", () => {
            const mockIssues: IssueApi[] = [
              { id: 1, title: "Issue 1", state: "open", created_at: "2024-01-01", updated_at: "2024-01-02", closedAt: null, assignee: null, number: 101, body: "", comments: 0, user: { login: "owner" }, repository_url: "repo" },
              { id: 2, title: "Issue 2", state: "open", created_at: "2024-01-02", updated_at: "2024-01-03", closedAt: null, assignee: null, number: 102, body: "", comments: 0, user: { login: "owner" }, repository_url: "repo" },
            ];
        
            const result = processIssues(mockIssues);
            expect(result.todo[0].id).toBe(1);
            expect(result.todo[1].id).toBe(2);
          });
    
});