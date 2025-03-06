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