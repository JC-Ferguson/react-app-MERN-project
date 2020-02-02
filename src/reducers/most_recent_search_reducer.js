const defaultState = {
    mostRecentQuery: localStorage.getItem("mostRecentSearch")
}

export default (state = defaultState ,action) => {
    switch(action.type){
        case "MOST_RECENT_SEARCH":
            return { ...state, mostRecentQuery: action.payload };
        default:
            return state; 
    };
}