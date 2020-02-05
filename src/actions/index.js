// create a function which returns an object with type: 'AUTH_TOKEN' and a payload token
// export the function

export const setAuthToken = (token = null) => {
    sessionStorage.setItem("token", token);
    return {
        type: "AUTH_TOKEN",
        payload: token
    };
};

export const setUser = (user = null) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    return {
        type: "USER",
        payload: user
    };
};

// function returns object containing the json of returned search query from database 
export const setSearchResult = ( result = "" ) =>{
    localStorage.setItem("learningContent", JSON.stringify(result));
    return {
        type: "SEARCH_RESULT",
        payload: result
    }
}

// function returns object containing most recent search
export const mostRecentSearch = (query = null ) =>{
    localStorage.setItem("mostRecentSearch", query)
    return {
        type: "MOST_RECENT_SEARCH",
        payload: query
    }
}

// function returns object containing last viewed document
export const setLastViewed = (content = null) =>{
    localStorage.setItem("lastViewed", JSON.stringify(content))
    return {
        type: "LAST_VIEWED",
        payload: content
    }
}