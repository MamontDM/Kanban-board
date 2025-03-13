export const inputValidator = (url: string) : {ownerName: string; repository: string} | null => {
    try {
        const parseUrl = new URL(url.trim());
        console.log(parseUrl);
        if(parseUrl.hostname !== "github.com"){
            return null;
        }

        const pathParts = parseUrl.pathname.split("/").filter(Boolean);
        
        if(pathParts.length !== 2) {
            return null;
        } 
        
        const [ownerName, repository] = pathParts;
        return {ownerName, repository}

    } catch (error) {
        return null;
    }
};