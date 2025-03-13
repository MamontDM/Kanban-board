import { useState } from 'react';
import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { useIssueStore }  from "../../store/issueStore";
import { useDragAndDrop } from "../../utils/Helprers/useDragAndDrop";
import styles from  './column-styles.module.css';
import IssueCard from "./IssuesCard/IssueCard";
import Column from "./ColumnItem/СolumnItem";


interface Columnitem {
    title: string;
    type: "todo" | "inProgress" | "done";
}

const Columns = () => {
    const moveIssue = useIssueStore((store) => store.moveIssue);

    const { activeTask, overTask, handleDragStart, handleDragOver, handleDragEnd } = useDragAndDrop({
        onMove: moveIssue,
    });

    const columnsData: Columnitem[] = [
        { title: "To Do", type: "todo"},
        { title: "In Progress", type: "inProgress"},
        { title: "Done", type: "done"},
    ]
   
    return (
       <DndContext  
            collisionDetection={rectIntersection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
       > 
                <div className={styles["columns-container"]}>
                    {columnsData.map((column) => (
                        <div key={column.type} className={styles["column-wrapper"]}>
                                <h2 className={styles["column-title"]}>{column.title}</h2>
                            <Column type={column.type} overTask={overTask} activeTask={activeTask}/>
                        </div>
                    ))}
                </div>
                <DragOverlay>
                {activeTask && (
                    <div className={styles["drag-overlay"]}>
                        <IssueCard issue={activeTask} />
                    </div>
                )}
                </DragOverlay>
        </DndContext>
    )
};

export default Columns;