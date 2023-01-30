import axios from 'axios';

const Instance = axios.create({
  withCredentials: true,
  baseURL: "https://avenuemochaapi.herokuapp.com",
});

export default Instance;