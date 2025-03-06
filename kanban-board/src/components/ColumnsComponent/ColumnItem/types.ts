import { Task } from "types/models";

export interface OverTask {
  id?: number;
  columnId: "todo" | "inProgress" | "done";
  positionBefore?: boolean;
  positionEnd?: boolean;
}

export interface ColumnProps {
  type: "todo" | "inProgress" | "done";
  overTask?: OverTask | null;
  activeTask?: Task | null;
}