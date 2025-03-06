import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useSourceDataManager } from "./externalApiRequest";
import { saveIssuesDB } from "../utilsDb/indexedDB";

vi.mock("../ApiDataProcessed/processedIssuesData", () => ({
  default: vi.fn(() => ({ todo: [], inProgress: [], done: [] }))
}));

vi.mock("../ApiDataProcessed/processedRepoData", () => ({
  default: vi.fn(() => []),
}));

vi.mock("../utilsDb/indexedDB", () => ({
  saveIssuesDB: vi.fn(),
}));

const loadReposMock = vi.fn();
vi.mock("@store/repoStore", () => ({
  useRepoStore: {
    getState: () => ({
      loadRepos: loadReposMock,
    }),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
     global.fetch = vi.fn()
      .mockResolvedValueOnce({ json: async () => null }) 
      .mockResolvedValueOnce({ json: async () => undefined });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useSourceDataManager", () => {
  it("return and logs when given invalid repoData", async () => {
    const consoleErroMock = vi.spyOn(console, "error").mockImplementation(() =>{});

    await useSourceDataManager({ownerName: "", repository: ""});

    expect(consoleErroMock).toHaveBeenCalledWith("Invalid repo data:", {ownerName: "", repository: ""});
    expect(fetch).not.toHaveBeenCalled();

    consoleErroMock.mockRestore();
  });

  it("fetches issues and repo data from GitHub API", async () => {
    await useSourceDataManager({ ownerName: "user", repository: "repo" });
  
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith("https://api.github.com/repos/user/repo/issues?state=all", expect.any(Object));
    expect(fetch).toHaveBeenCalledWith("https://api.github.com/repos/user/repo", expect.any(Object));
  });

  it("saves processed data to IndexedDB", async () => {
    await useSourceDataManager({ ownerName: "user", repository: "repo" })
    expect(saveIssuesDB).toHaveBeenCalled();
  });

  it("calls loadRepository", async () => {
    await useSourceDataManager({ ownerName: "user", repository: "repo" });
  
    expect(loadReposMock).toHaveBeenCalled();
  });
});