import React from 'react'
import Columns from './columnsComponent/Columns';
import RepoList from './TrackedRepoList/repoList';
import UrlInput from './inputReqUrl/Input';
import BreadCrumbs from './breadCrumbs/breadCrumbs';
import './layoutStyles.css';

const Layout = React.memo(() => {
    return (
        <div className="wrapper-app">
            <div className="main-content">
                <UrlInput />
                <BreadCrumbs />
                <Columns  />
        </div>
            <div className="right-sideBar">
                <RepoList />
            </div>
        </div>
    );
});

export default Layout;
