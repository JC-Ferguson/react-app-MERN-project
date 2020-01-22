const defaultState = { 
    token: null
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'AUTH_TOKEN':
            return {...state, token: action.payload};
        default:
            return state;
    };
};
