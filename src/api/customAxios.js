import axios from 'axios';

const customAxios = axios.create({
    baseURL: `${process.env.REACT_APP_EXPRESS}`
});

export default customAxios;