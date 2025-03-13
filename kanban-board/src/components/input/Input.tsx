import React, { useState } from "react";
import { useSourceDataManager } from "../../utils/ApiDataRequest/externalApiRequest";
import { inputValidator } from "../../utils/Helprers/inputvalidator";
import styles from "./inputStyles.module.css";

const UrlInput = React.memo(() => {
    const [placeholder, setPlaceholder] = useState("Enter repository URL")
    const [inputValue, setInputValue] = useState<string>("");



    const handleFetch = async () => {
        const repoData = inputValidator(inputValue);
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
                <strong>Load</strong> 
            </button>
        </div>
    </>
  );
});

export default UrlInput;

