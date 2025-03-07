import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import Column from "./СolumnItem";
import { useDroppable } from "@dnd-kit/core";
import { useIssueStore } from "@store/issueStore";
import { baseMockStore } from "../../../utils/testUtils/mockStoreObject";
import { OverTask } from "./types";

vi.mock("@store/issueStore", () => ({
  useIssueStore: vi.fn(),
}));

const mockOverTask: OverTask = {
    id: 1,
    columnId: "todo",
    positionBefore: true,
    positionEnd: false,
  };

beforeEach(() => {
    vi.mocked(useIssueStore).mockImplementation((selector) =>
      selector(
        Object.assign({}, baseMockStore, {
          todo : [
            {id: 1, type: "todo", title: "Task 1"},
            {id: 2, type: "todo", title: "Task 2"}
          ]
        })
      )
  );
});


describe("Column component", () => {
    it("Render task from useIssueStore" , () => {
        render(<Column type="todo" overTask={null} activeTask={null} />);

        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    it("Render empty taskList", () => {
        vi.mocked(useIssueStore).mockReturnValue([]);
        render(<Column type="todo" overTask={null} activeTask={null} />);
        expect(screen.getByText(/Task list is empty/i)).toBeInTheDocument();
    });

    it("Render `drop here` if overTask is present", () => {
        render(<Column type="todo" overTask={mockOverTask} activeTask={null} />);
        expect(screen.getByText("Drop Here")).toBeInTheDocument();
      });
});