import axios from 'axios';

const API = axios.create({
	timeout: 10000,
	baseURL: 'http://localhost:8080/api'
});

export default API;
