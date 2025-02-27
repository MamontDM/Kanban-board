import './issue.css';
import { useDraggable } from '@dnd-kit/core';

const IssueCard = ({ issue }) => {

    const createdDate = new Date(issue.createdAt);  
    const differentMS = Date.now() - createdDate;
    const diffDays = Math.floor(differentMS / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((differentMS % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: issue.id,
        data:  issue.state,
      });


      const style = {
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      };

return (
        <div ref={setNodeRef} {...listeners}{...attributes} style={style} className={"issue-content-card"}>
            <label className="issue-title">{issue.title}</label>
            <div className="issue-info"> 
                <span>
                    #{issue.number} opened{" "}
                    {diffDays > 0 && `${diffDays} days`}
                    {" "}{diffHours > 0 ? `${diffHours} hours ago` : "just now"} <br></br>
                    <strong>{`order is : ${issue.order}`}</strong> <br></br>
                    <strong>{`number is: ${issue.number}`}</strong>
                </span>
            </div>
            <div className="issue-metadata">
                    <strong>{issue.author}</strong> | Comments: {issue.comments}
            </div>
        </div>
    )
};

export default IssueCard;