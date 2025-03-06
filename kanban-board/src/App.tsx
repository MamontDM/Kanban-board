import { useEffect } from 'react'
import Layout from './components/Layout'
import { useRepoStore } from './store/repoStore';
import { useIssueStore } from './store/issueStore';
import { synchronizeZustandState } from './utils/utilsDb/synchronizeData';

const  App = () => {
  const loadRepos = useRepoStore.getState().loadRepos;
  const activeRepo = useRepoStore((state) => state.activeRepoKey);
  const loadIssues = useIssueStore.getState().loadIssuesFromDB; 
  const isLoaded = useIssueStore((state) => state.isLoaded);

  useEffect(() => {
    loadRepos();
  }, [loadRepos]);

  useEffect(() => {
    if (activeRepo) {
      loadIssues(activeRepo);
    }
  }, [activeRepo, loadIssues]);

  useEffect(() => {
    if (isLoaded) {
      synchronizeZustandState();
    }
  }, [isLoaded]);


  return <Layout />;
};

export default App;
