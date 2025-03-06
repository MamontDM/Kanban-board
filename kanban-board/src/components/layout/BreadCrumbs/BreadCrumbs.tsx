import { useIssueStore } from '../../../store/issueStore';
import arrowIcon from '../../../assets/arrow.png';
import starIcon from '../../../assets/star.png';
import styles from  "./bread-crumbs.module.css";

const BreadCrumbs = () => {
    const metaData =  useIssueStore((store) => store.metaDataRepo[0]);
    if(!metaData) return null;
    const {userName, userGit, htmlUrl, gitStars, repoName} = metaData;
    
    const handleClick = (value : string) => {
        window.open(`${value}`, "_blank");
    };

    return (
       <div className={styles["breadcrumbs-container"]}>
            <span className={styles["breadcrumbs-item"]} onClick={() => handleClick(userGit)}>
                {userName}
            </span>
            <img className={styles["arrow"]} src={arrowIcon} alt="arrow"/>
            <span className={styles["breadcrumbs-item"]} onClick={() => handleClick(htmlUrl)}>
                {repoName}
            </span>
            <img src={starIcon} alt="stars" className={styles["star-icon"]} /> : {gitStars}
        </div>
    )
};

export default BreadCrumbs;