import { useState } from 'react';
import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { useIssueStore }  from '../../store/issueStore';
import styles from  './column-styles.module.css';
import IssueCard from "./IssuesCard/IssueCard";
import Column from "./ColumnItem/СolumnItem";
import { Task } from '../../types/models';


interface OverTask {
    id?: number;
    columnId: "todo" | "inProgress" | "done";
    positionBefore?: boolean;
    positionEnd?: boolean;
  }

interface Columnitem {
    title: string;
    type: "todo" | "inProgress" | "done";
}

const Columns = () => {
    const moveIssue = useIssueStore((store) => store.moveIssue);
    const [ activeTask, setActiveTask ] = useState<Task | null>(null);
    const [ overTask, setOverTask ] = useState<OverTask | null>(null);
  
    const columnsData: Columnitem[] = [
        { title: "To Do", type: "todo"},
        { title: "In Progress", type: "inProgress"},
        { title: "Done", type: "done"},
    ]
   
    return (
       <DndContext  collisionDetection={rectIntersection} 
       onDragStart={({ active }) => setActiveTask(active.data.current as Task)}  
       onDragOver={({ active, over}) => {
            if (!over || active.id === over.id) return;
            const overTaskId = Number(over.id);
            const overColumnId = over.data.current?.state ?? over.id;
            const isOverColumn = over.data.current?.isColumn === true;
            const isFirstTask = over.data.current?.order;

            setOverTask(prev => {
                if(isOverColumn){
                    return prev?.columnId === overColumnId && prev?.positionEnd
                    ? prev  : {columnId: overColumnId, positionEnd: true};
                }else {
                    const activeRect = active.rect.current.translated;
                    const overRect = over.rect;
                    if (!activeRect || !overRect) return prev;

                    const isFirstItem = over.data.current?.order === 1;
                    const positionBefore = isFirstItem 
                    ?  activeRect.top < overRect.top
                    : (activeRect.top + activeRect.height / 2) < (overRect.top + overRect.height / 2);

                    return prev?.id === overTaskId && prev?.columnId === overColumnId && prev?.positionBefore === positionBefore
                    ? prev
                    : { id: overTaskId, columnId: overColumnId, positionBefore };

                }
        });
    }} 
       onDragEnd={() => {
        console.log("called o=in componnets")
        if (!overTask || !activeTask) return;
                moveIssue(
                    activeTask.id, 
                    activeTask.state, 
                    overTask.columnId, 
                    overTask.positionBefore ?? false, 

                    overTask.id, 
                    overTask.positionEnd);
                setOverTask(null);
                setActiveTask(null);
       }}>
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