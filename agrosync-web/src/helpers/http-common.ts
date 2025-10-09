import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_URL as string) || '';

export const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
});

export default http;