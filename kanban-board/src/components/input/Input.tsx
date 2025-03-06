import React, { useState } from "react";
import { useSourceDataManager } from "../../utils/ApiDataRequest/externalApiRequest";
import styles from "./inputStyles.module.css";

const UrlInput = React.memo(() => {
    const [placeholder, setPlaceholder] = useState("Enter repository URL")
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
        <div className={styles["input-container"]}>
        <input
            className={styles["input-area"]}
            placeholder={placeholder}
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder("Enter repository URL")}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            />
            <button
                    className={styles["input-load-button"]}
                    onClick={ handleFetch}
            >
                Load issues
            </button>
        </div>
    </>
  );
});

export default UrlInput;

