// create a function which returns an object with type: 'AUTH_TOKEN' and a payload token
// export the function

// action creator for auth token
export const setAuthToken = (token = null) => {
    sessionStorage.setItem("token", token);
    return {
        type: "AUTH_TOKEN",
        payload: token
    };
};

// action creator for user
export const setUser = (user = null) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    return {
        type: "USER",
        payload: user
    };
};

// action creator for learning content from database
export const setSearchResult = ( result = "" ) =>{
    localStorage.setItem("learningContent", JSON.stringify(result));
    return {
        type: "SEARCH_RESULT",
        payload: result
    }
}

// action creator for most recent search query
export const mostRecentSearch = (query = null ) =>{
    localStorage.setItem("mostRecentSearch", query)
    return {
        type: "MOST_RECENT_SEARCH",
        payload: query
    }
}

// action creator for last viewed document
export const setLastViewed = (content = null) =>{
    localStorage.setItem("lastViewed", JSON.stringify(content))
    return {
        type: "LAST_VIEWED",
        payload: content
    }
}

export const setProgressTracker = (progress = []) =>{
    localStorage.setItem("progressTracker", JSON.stringify(progress));
    return {
        type: "PROGRESS_TRACKER",
        payload: progress
    }
}

export const setUserViewedTags = ( progress = {} )=> {
    localStorage.setItem("userProgress", JSON.stringify(progress));
    return {
        type: "USER_VIEWED_TAGS",
        payload: progress
    }
}

export const setTotalViewedTags = ( progress = {} ) => {
    localStorage.setItem("totalProgress", JSON.stringify(progress));
    return {
        type: "TOTAL_VIEWED_TAGS",
        payload: progress
    }
}