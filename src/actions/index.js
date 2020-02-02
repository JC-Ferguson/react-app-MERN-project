// create a function which returns an object with type: 'AUTH_TOKEN' and a payload token
// export the function

export const setAuthToken = (token = null) => {
    sessionStorage.setItem("token", token);
    return {
        type: "AUTH_TOKEN",
        payload: token
    };
};

export const setSearchResult = ( result = "" ) =>{
    localStorage.setItem("learningContent", JSON.stringify(result));
    return {
        type: "SEARCH_RESULT",
        payload: result
    }
}

export const mostRecentSearch = (query = null ) =>{
    localStorage.setItem("mostRecentSearch", query)
    return {
        type: "MOST_RECENT_SEARCH",
        payload: query
    }
}

export const setLastViewed = (content = null) =>{
    localStorage.setItem("lastViewed", JSON.stringify(content))
    return {
        type: "LAST_VIEWED",
        payload: content
    }
}