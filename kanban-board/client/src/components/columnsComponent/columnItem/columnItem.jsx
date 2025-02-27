import React, {useEffect, useMemo} from 'react';
import { useDroppable } from '@dnd-kit/core';
import IssueCard from '../issuesCard/issueCard';
import { useRepoStore } from '../../../store/useRepoStore/repoStore';
import { useIssueStore } from '../../../store/useIssuesStore/issueStore';



const Column = ({ type }) => {
  const issues = useIssueStore((store) => store[type]);
  const { setNodeRef, isOver } = useDroppable({
    id: type,
  });


return (
  <div ref={setNodeRef}  className={`column-item ${isOver ? "highlight" : ""}`}>
          {issues.map((issue, index) => (
                   <IssueCard key={issue.id} issue={issue}/>
              ))}
          </div> 
        )}

export default Column;
