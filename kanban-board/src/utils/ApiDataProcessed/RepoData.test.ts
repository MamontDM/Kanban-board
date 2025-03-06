import { describe, it, expect } from "vitest";
import processMetaData from "./processedRepoData";

describe("processMetaData", () => {
    it("returns empty arrays when given null", () => {
        const result = processMetaData(null);
            expect(result).toEqual([
            {
                userName: "Unknown",
                repoName: "Unknown Repo",
                userGit:  "#",
                gitStars:  0,
                htmlUrl: "#",
            }
        ]);
    });

    it("returns empty arrays when given undefined", () => {
        const result = processMetaData(undefined);
            expect(result).toEqual([
            {
                userName: "Unknown",
                repoName: "Unknown Repo",
                userGit:  "#",
                gitStars:  0,
                htmlUrl: "#",
            }
        ]);
    });



});