import {useState, useCallback } from "react"
import { DragStartEvent, DragOverEvent, DragEndEvent } from "@dnd-kit/core"
import { Task } from "types/models";
import { IssueState } from "@store/types";

interface OverTask {
    id?: number;
    columnId: "todo" | "inProgress" | "done";
    positionBefore?: boolean;
    positionEnd?: boolean;
}

interface UseDragAndDropPrors {
    onMove:( 
        taskId: number,
        currentState: IssueState,
        newState: IssueState,
        positionBefore: boolean,
        overTaskId?: number,
        positionEnd?: boolean
    ) => void;
}

export const useDragAndDrop  = ({onMove}: UseDragAndDropPrors) => {
    const [ activeTask, setActiveTask ] = useState<Task | null>(null);
    const [ overTask, setOverTask ] = useState<OverTask | null>(null);

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveTask(event.active.data.current as Task);
    },[]);

    const handleDragOver = useCallback((event: DragOverEvent) =>{
        const { active, over} = event;
        if (!over || active.id === over.id) return;
        const overTaskId = Number(over.id);
        const overColumnId = over.data.current?.state ?? over.id;
        const isOverColumn = over.data.current?.isColumn === true;

        setOverTask(prev => {
            if(isOverColumn) {
                console.log("isOverColumn");
                return prev?.columnId === overColumnId && prev?.positionEnd
                ? prev 
                : { columnId: overColumnId, positionEnd: true};
            }else {
                const activeRect = active.rect.current.translated;
                const overRect = over.rect;
          
                if(!activeRect || !overRect) return prev;
                const isFirstItem = over.data.current?.order === 1;
                const positionBefore = isFirstItem
                ? activeRect.top < overRect.top
                : (activeRect.top + activeRect.height / 2) < (overRect.top + overRect.height / 2)
            return prev?.id === overTaskId && prev?.columnId === overColumnId && prev?.positionBefore === positionBefore
                ? prev
                : { id: overTaskId, columnId: overColumnId, positionBefore};
            }
        });
    },[]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        if(!overTask || !activeTask) return;

        onMove(
            activeTask.id,
            activeTask.state,
            overTask.columnId,
            overTask.positionBefore ?? false,
            overTask.id,
            overTask.positionEnd
        );
        setOverTask(null);
        setActiveTask(null);
    }, [activeTask, overTask, onMove]);
    return {
        activeTask,
        overTask,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    };
}