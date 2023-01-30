import axios from 'axios';

const Instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export default Instance;