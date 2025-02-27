import { useEffect } from 'react'
import Layout from './components/Layout'
import { useRepoStore } from './store/useRepoStore/repoStore';
import { useIssueStore } from './store/useIssuesStore/issueStore';

const  App = () => {
  const loadRepos = useRepoStore.getState().loadRepos;
  const activeRepo = useRepoStore((state) => state.activeRepoKey);
  const loadIssues = useIssueStore.getState().loadIssuesFromDB; 

  useEffect(() => {
    loadRepos();
  }, [loadRepos]);

  useEffect(() => {
    if (activeRepo) {
      loadIssues(activeRepo);
    }
  }, [activeRepo, loadIssues]);

  return <Layout />;
};

export default App;
