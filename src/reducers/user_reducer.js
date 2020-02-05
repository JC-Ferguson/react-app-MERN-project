const defaultState = { 
    user: sessionStorage.getItem('user')
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'USER':
            return {...state, user: action.payload};
        default:
            return state;
    };
};
