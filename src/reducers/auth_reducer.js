const defaultState = { 
    token: sessionStorage.getItem('token')
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'AUTH_TOKEN':
            return {...state, token: action.payload};
        default:
            return state;
    };
};
