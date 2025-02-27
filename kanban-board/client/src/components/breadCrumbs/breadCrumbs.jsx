import { useIssueStore } from '../../store/useIssuesStore/issueStore';
import { useRepoStore } from '../../store/useRepoStore/repoStore';
import './breadCrumbs.css';

const BreadCrumbs = () => {
    const metaData =  useIssueStore((store) => store.metaDataRepo);

    // if(!metaData || Object.keys(metaData).length === 0) return null;

    // const {userName, userGit, htmlUrl, gitStars, repoName} = metaData.metaDataRepo;

    const handleClick = (value) => {
        console.log(value);
        window.location.href =`${value}`
    };


    return (
       <div className="breadcrumbs-container">
            <span
                className=""
                onClick={() => handleClick(userGit)}
            >
                {/* {userName || ""} */}
            </span>

            <img src="" alt="tempIcon"/>

            <span
                onClick={() => handleClick(htmlUrl)}
            >
                {/* {repoName || ""} */}
            </span>
            <img src="" alt="numberOfStars" />
        </div>
    )
};

export default BreadCrumbs;