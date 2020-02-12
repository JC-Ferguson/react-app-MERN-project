const defaultState = {
    progressTracker: JSON.parse(localStorage.getItem("progressTracker")),
    userProgress: JSON.parse(localStorage.getItem("userProgress")),
    totalProgress: JSON.parse(localStorage.getItem("totalProgress"))
}

export default (state = defaultState ,action) => {
    switch(action.type){
        case "PROGRESS_TRACKER":
           return { ...state, progressTracker: action.payload }
        case "USER_VIEWED_TAGS":
            return { ...state, userProgress: action.payload }
        case "TOTAL_VIEWED_TAGS":
            return { ...state, totalProgress: action.payload }
        default:
            return state; 
    };
}

// if (state.progressTracker){
//     const copies = state.progressTracker.map( i =>{
//         return JSON.stringify(i);
//     })

//     if (copies.includes(JSON.stringify(action.payload[0]))){
//         return state;
//     } else {
//         return { ...state, progressTracker: [...state.progressTracker, ...action.payload] }; 
//     }
// } else {
//     return { ...state, progressTracker: action.payload };
// }