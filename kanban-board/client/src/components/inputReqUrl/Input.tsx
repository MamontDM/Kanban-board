import React, { useState } from 'react';
import { useSourceDataManager } from '../../store/getGitHubData/useGitHubApi';
import './inputStyles.css'

const UrlInput = React.memo(() => {
    console.log("input render");

    const [inputValue, setInputValue] = useState<string>("");
    

    const extractInfoFromInput = (url: string) : {ownerName: string; repository: string} | null => {
        const regularExp = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/;
        const match = url.match(regularExp);
        if(match) {
            return {ownerName: match[1], repository: match[2] };
        }
        return null;
    };

    const handleFetch = async () => {
        if(!inputValue.trim()){
            alert("Please enter a valid GitHub repository URL!");
            return;
        }

    const repoData = extractInfoFromInput(inputValue);
    if (!repoData) {
      alert("Please enter a valid GitHub repository URL!");
      return;
    }


    useSourceDataManager(repoData);
}

return (
    <> 
        <div className="input-container">
        <input
            className="input-area"
            placeholder="Enter repo URL"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            />
            <button
                    className="input-load-button"
                    onClick={ handleFetch}
            >
                Load issues
            </button>
        </div>
    </>
  );
});

export default UrlInput;

