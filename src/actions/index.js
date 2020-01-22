// create a function which returns an object with type: 'AUTH_TOKEN' and a payload token
// export the function

export const setAuthToken = (token = null) => {
    sessionStorage.setItem('token', token);
    return {
        type: 'AUTH_TOKEN',
        payload: token
    };
};