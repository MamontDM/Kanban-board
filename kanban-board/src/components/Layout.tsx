import React from 'react'
import Columns from "./ColumnsComponent/Columns";
import RepoList from "./layout/TrackedRepoList/repoList";
import UrlInput from "./Input/Input";
import BreadCrumbs from "./layout/BreadCrumbs/BreadCrumbs";
import styles from "./layoutStyles.module.css";

const Layout = React.memo(() => {
    return (
        <div className={styles["wrapper-app"]}>
            <div className={styles["main-content"]}>
                <UrlInput />
                <BreadCrumbs />
                <Columns  />
        </div>
            <div className={styles["right-sideBar"]}>
                <RepoList />
            </div>
        </div>
    );
});

export default Layout;
