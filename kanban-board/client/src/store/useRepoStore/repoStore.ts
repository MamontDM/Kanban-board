import { create } from "zustand";
import { getTrackedRepo } from "../../utilsDB/indexedDB";

export const useRepoStore = create<RepoStoreState>((set, get) => ({
    repos:[],
    activeRepoKey: null,

    loadRepos: async ( repoKey = null) => {
        const reposFromDB = await getTrackedRepo();
        console.log("Repos from DB:", reposFromDB);
        const repos = reposFromDB.map(repo => ({ id: repo })); 
        set({ repos });

        if(repos.length > 0) {
            if(repoKey && repos.some(repo => repo.id === repoKey)){
                set ({ activeRepoKey: repoKey});
            }else if(!get().activeRepoKey) {
                set ({activeRepoKey: repos[0].id});
            }
        }
    },

    setActiveRepo: (repoKey) => {
        set({ activeRepoKey: repoKey});
    },
}));



interface RepoStoreState {
    repos: {id: string }[];
    activeRepoKey: string | null;
    loadRepos : ( repoKey? : string | null) => Promise<void>;
    setActiveRepo: (repoKey: string) => void;
}