// create a function which returns an object with type: 'AUTH_TOKEN' and a payload token
// export the function

export const setAuthToken = (token = null) => {
    return {
        type: 'AUTH_TOKEN',
        payload: token
    };
};