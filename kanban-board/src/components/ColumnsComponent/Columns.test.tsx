import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Columns from "./Columns";
import "@testing-library/jest-dom"
import { baseMockStore } from "../../utils/testUtils/mockStoreObject";
import { DndContext } from "@dnd-kit/core";

vi.mock("@store/issueStore", () => ({
  useIssueStore: vi.fn(),
}));
const moveIssue = vi.fn();

import { useIssueStore } from "@store/issueStore";
const useIssueStoreMock = vi.mocked(useIssueStore, { deep: true });

beforeEach(() => {
  vi.resetModules();
  useIssueStoreMock.mockImplementation((selector: any) =>
    selector({
      ...baseMockStore,
      moveIssue,
    })
  );
});

describe("Columns component", () => {

  it("renders titles", () => {
    render(<Columns />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("set ActiveTask on drag start", () =>{
    const onDragStartMock = vi.fn();
    render(
    <DndContext onDragStart={onDragStartMock}> 
        <Columns />
    </DndContext>
    );

    const dragStartEvent = {
      active: { id: 1, title: "Task 1", data:{  current:{ id: 1, state: "todo" }}},};
      act(() => {
        onDragStartMock(dragStartEvent);
      });

    expect(onDragStartMock).toHaveBeenCalledTimes(1);
    expect(onDragStartMock).toHaveBeenCalledWith(dragStartEvent);
  });
});
