import React, {useEffect, useRef, useState, useMemo} from 'react';
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import IssueCard from "../IssuesCard/IssueCard";
import { useIssueStore } from "../../../store/issueStore";
import { ColumnProps } from './types';
import styles from "../column-styles.module.css"

const Column: React.FC<ColumnProps> = ({ type, overTask, activeTask }) => {
  const issues = useIssueStore((state) => state[type as "todo" | "inProgress" | "done"]);

  const { setNodeRef, isOver } = useDroppable({
    id: type,
    data: { type, isColumn: true },
  });

  return (
    <div ref={setNodeRef} data-testid={`column-${type}`}  className={styles["column-item"]}>
        <SortableContext id={type} items={issues.map((issue) => issue.id)}>
        {issues.length === 0 && <div className={styles["empty-placeholder"]}>Task list is empty, please load issues</div>}
          {issues.map((issue) => (
            <React.Fragment key={issue.id}>
                {overTask?.id === issue.id && overTask?.positionBefore && (<div className={styles["placeholder"]}>➕ Placeholder</div>)}

                {activeTask?.id !== issue.id && <IssueCard issue={issue} />}

                {overTask?.id === issue.id && !overTask.positionBefore && (<div className={styles["placeholder"]}>➕ Placeholder</div>)}
            </React.Fragment>
        ))}
        {overTask?.positionEnd && overTask?.columnId === type && <div className={styles["placeholder"]}>➕ Placeholder</div>}
        </SortableContext>
    </div>
)}
export default Column;
