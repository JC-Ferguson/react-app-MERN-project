import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'https://accordanthelp.herokuapp.com'
});

export default customAxios;