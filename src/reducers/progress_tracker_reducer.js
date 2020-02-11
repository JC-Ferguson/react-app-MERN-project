const defaultState = {
    progressTracker: JSON.parse(localStorage.getItem("progressTracker"))
}

export default (state = defaultState ,action) => {
    switch(action.type){
        case "PROGRESS_TRACKER":
           return { ...state, progressTracker: action.payload }
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