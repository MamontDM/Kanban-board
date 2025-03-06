import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";
import BreadCrumbs from "./BreadCrumbs";
import { baseMockStore } from "../../../utils/testUtils/mockStoreObject";
import { useIssueStore } from "@store/issueStore";

vi.mock("@store/issueStore", () => ({
  useIssueStore: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(useIssueStore).mockImplementation((selector) =>
    selector({
      ...baseMockStore, 
        metaDataRepo: [{ 
          userName: "JohnDoe",
          repoName: "TestRepo",
          userGit: "https://github.com/TestUserJohn",
          gitStars: 2,
          htmlUrl: "https://github.com/TestUser/Repo",
        }]
      })
    )
  Object.defineProperty(window, "location", {
    value: {
      assign: vi.fn(),
    },
    writable: true,
  });
  vi.spyOn(window, "open").mockImplementation(() => null);
});

  describe("BreadCrumbs component", () => {
    it("Render with Data", () => {
      render(<BreadCrumbs />);

        expect(screen.getByText(/JohnDoe/i)).toBeInTheDocument();
        expect(screen.getByText(/TestRepo/i)).toBeInTheDocument();
        expect(screen.getByText(/:\s*2/i)).toBeInTheDocument();
    });

    it("Click `userGit` calls `window.open` with correct URL", async () => {
      render(<BreadCrumbs />);

        const userLink = screen.getByText(/JohnDoe/i);
        await userEvent.click(userLink);

        expect(window.open).toHaveBeenCalledWith("https://github.com/TestUserJohn", "_blank");
    });

    it("Click `htmlUrl` calls `window.open` with correct URL", async () => {
      render(<BreadCrumbs />);

        const repoLink = screen.getByText(/TestRepo/i);
        await userEvent.click(repoLink);

        expect(window.open).toHaveBeenCalledWith("https://github.com/TestUser/Repo", "_blank");
    });

    it("If `metaData` is empty - render not happend", () => {
      vi.mocked(useIssueStore).mockReturnValue({ metaDataRepo: [] });
        render(<BreadCrumbs />);

        expect(screen.queryByText(/JohnDoe/i)).not.toBeInTheDocument();
    });
});
