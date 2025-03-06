import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect, it, describe, beforeEach } from "vitest";
import "@testing-library/jest-dom"
import { useRepoStore } from "../../../store/repoStore";
import { repoMockStore } from "../../../utils/testUtils/mockStoreObject";
import RepoList from "./repoList";

vi.mock("../../../store/repoStore", () => ({
  useRepoStore: vi.fn(),
}));

beforeEach(() => {
    vi.mocked(useRepoStore).mockImplementation((selector) =>
      selector({
        ...repoMockStore,
        repos: [ 
            { id: "repo-test1"},
            { id: "repo-test2"}
            ]
        })
    );
});


describe("RepoList Component", () => {
  it("render without repo", () => {
    vi.mocked(useRepoStore).mockImplementation((selector) =>
        selector({ ...repoMockStore, repos: [] })
      );
    const { container } = render(<RepoList />);
    expect(container.firstChild).toBeNull();

});

  it("render list of tracked repository", () => {
    render(<RepoList />);
    
    expect(screen.getByText("Tracked repository")).toBeInTheDocument();
    expect(screen.getByText("repo-test1")).toBeInTheDocument();
    expect(screen.getByText("repo-test2")).toBeInTheDocument();
  });

  it("change active repository", () => {
    const mockSetActiveRepo = vi.fn();
    (useRepoStore as unknown as ReturnType<typeof vi.fn>)
      .mockImplementation((selector) =>
        selector({
          repos: [{ id: "repo1" }, { id: "repo2" }],
          setActiveRepo: mockSetActiveRepo,
        })
      );

    render(<RepoList />);
    const repoButton = screen.getByText("repo1");
    fireEvent.click(repoButton);

    expect(mockSetActiveRepo).toHaveBeenCalledWith("repo1");
    expect(repoButton.className).toContain("active");
  });
});
