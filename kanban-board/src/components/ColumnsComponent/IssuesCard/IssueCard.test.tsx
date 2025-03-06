import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom"
import { IssueState } from "store/types";
import { Task } from "types/models";
import IssueCard from "./IssueCard";

const mockTask: Task = {
  id: 1,
  title: "Test Issue",
  number: 42,
  state: "todo",
  createdAt: new Date(Date.now() - 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
  closedAt: null,
  assignee: null,
  body: "Issue description",
  comments: 5,
  ownerUser: "JohnDoe",
  repoUrl: "https://github.com/user/repo",
  order: 1,
}

vi.mock("dnd-kit/sortable", () =>({
    useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}));

describe("Issues component", () => {
    it("Rednder without fail", () => {
        render(<IssueCard issue={mockTask} />);
        expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    });
    it("Issue number is correct" , () => {
        render(<IssueCard issue={mockTask} />);
        expect(screen.getByText(new RegExp(`#${mockTask.number}`))).toBeInTheDocument();
    });
    it("Rendered owner`s name ", () => {
        render(<IssueCard issue={mockTask} />);
        screen.debug();
        expect(screen.getByText(mockTask.ownerUser)).toBeInTheDocument();
        expect(screen.getByText(/Comments:\s*5/i)).toBeInTheDocument();
    });
    it("Formating Data", () => {
        render(<IssueCard issue={mockTask} />);
        expect(screen.getByText(/1 days/i)).toBeInTheDocument(); 
    });
});
