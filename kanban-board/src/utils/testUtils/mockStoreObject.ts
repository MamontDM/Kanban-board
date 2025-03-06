import { vi } from "vitest";

export const baseMockStore = {
  key: "test-key",
  todo: [],
  inProgress: [],
  done: [],
  metaDataRepo: [],
  isLoaded: true,
  moveIssue: vi.fn(),
  loadIssuesFromDB: vi.fn(),
};


export const repoMockStore = {
  repos:[],
  activeRepoKey: null,
  loadRepos: vi.fn(),
  setActiveRepo: vi.fn(),
}