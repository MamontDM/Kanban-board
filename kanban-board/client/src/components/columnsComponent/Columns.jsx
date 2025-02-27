import React, {useState, useEffect} from 'react';
import { DndContext } from '@dnd-kit/core';
import Column from './columnItem/columnItem';
import { useIssueStore }  from '../../store/useIssuesStore/issueStore';
import './columnStyles.css';


const Columns = () => {
    const moveIssue = useIssueStore((store) => store.moveIssue);
    const isLoaded = useIssueStore((store) => store.isLoaded);

    const columnsData = [
        { title: "To Do", type: "todo"},
        { title: "In Progress", type: "inProgress"},
        { title: "Done", type: "done"},
    ]
    
    if (!isLoaded) {
      console.log("⏳ Waiting for issues to load...");
      return <div>Loading tasks...</div>;
    }
    const handleDragEnd = (event) => {
        console.log(event.active.id);
        console.log(event.active.data.current);
        console.log(event.over.id);
        console.log("Drag Ended:", event);
      };
    //   moveIssue : (id : number, currentState: IssueState, newState: IssueState, newOrder: number )


    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div  className="columns-container">
                {columnsData.map((column) => (
                    <div key={column.type} className="column-wrapper">
                            <h2 className="column-title">{column.title}</h2>
                        <Column type={column.type} />
                    </div>
                ))}
            </div>
        </DndContext>
    )
};

export default Columns;