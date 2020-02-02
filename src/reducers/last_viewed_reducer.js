const defaultState = {
    mostRecentDocument: JSON.parse(localStorage.getItem("lastViewed"))
}

export default (state = defaultState ,action) => {
    switch(action.type){
        case "LAST_VIEWED":
            return { ...state, mostRecentDocument: action.payload };
        default:
            return state; 
    };
}