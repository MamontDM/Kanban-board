import { useEffect } from 'react'
import { useRepoStore } from '../../store/useRepoStore/repoStore';
import './repoList.css';

const RepoList = () => {
    const repos = useRepoStore((store) => store.repos)
    const changeActiveRepo = useRepoStore((state) => state.setActiveRepo);

    if (repos.length === 0) return null;

    return (
        <div className="repoList-box">
            <label className="repoList-label"> Tracked repository</label>
            {repos.map((repository) => (
                <button className="repoList-item" 
                    key={repository.id}
                    onClick={(e) => changeActiveRepo(repository.id)}
                    >
                    {repository.id}
                </button>
            ))}
        </div>
    )
};

export default RepoList;