import { useEffect, useState } from "react"
import { useRepoStore } from "../../../store/repoStore";
import  styles from "./repoList.module.css";

const RepoList = () => {
    const [isActive, setIsActive] = useState<string | null>(null);
    const repos = useRepoStore((store) => store.repos)
    const changeActiveRepo = useRepoStore((state) => state.setActiveRepo);

    if (repos.length === 0) return null;

    const hadnleClick = (repoId: string ) => {
        setIsActive(repoId);
        changeActiveRepo(repoId);
    };

    return (
        <div className={styles["repoList-box"]}>
            <label className={styles["repoList-label"]}> Tracked repository</label>
            {repos.map((repository) => (
                <button className={`${styles["repoList-item"]} ${ isActive === repository.id ? styles["active"] : ""}`}
                    key={repository.id}
                    onClick={(e) => hadnleClick(repository.id)}
                    >
                    {repository.id}
                </button>
            ))}
        </div>
    )
};

export default RepoList;