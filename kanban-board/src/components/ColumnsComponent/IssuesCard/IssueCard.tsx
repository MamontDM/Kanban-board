import styles from  './issue-card.module.css';
import { useSortable } from '@dnd-kit/sortable';
import { Task } from '../../../types/models';


interface IssueCardProps {
    issue: Task;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
    const createdDate = new Date(issue.createdAt);

    const differentMS = Date.now() - createdDate.getTime();
    const diffDays = Math.floor(differentMS / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((differentMS % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: issue.id,
        data: {...issue},
        animateLayoutChanges: () => false,
     
      });


      return (
        <div ref={setNodeRef} {...listeners}{...attributes}
        style={{
            transform: transform ? `translate3d(${transform.x}px, ${transform.y}.px, 0)` : undefined,
            transition: "none",
    }} 
    className={styles["issue-content-card"]}>
            <label className={styles["issue-title"]}>{issue.title}</label>
            <div className={styles["issue-info"]}> 
                <span>
                    #{issue.number} opened{" "}
                    {diffDays > 0 && `${diffDays} days`}
                    {" "}{diffHours > 0 ? `${diffHours} hours ago` : "just now"} <br></br>
                </span>
            </div>
            <div className={styles["issue-metadata"]}>
                <span className={styles["owner"]}>{issue.ownerUser}</span>
                <span className={styles["separator"]}>|</span>
                <span className={styles["comments"]}> Comments:{issue.comments}</span>
            </div>
        </div>
    )
};

export default IssueCard;