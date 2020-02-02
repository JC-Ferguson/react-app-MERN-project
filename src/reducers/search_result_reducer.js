const defaultState = {
    learningContent: JSON.parse(localStorage.getItem("learningContent"))
}

export default (state = defaultState ,action) => {
    switch(action.type){
        case "SEARCH_RESULT":
            return { ...state, learningContent: action.payload };
        default:
            return state; 
    };
}