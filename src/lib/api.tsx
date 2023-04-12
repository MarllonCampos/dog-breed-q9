import axios from "axios";
import { Storage } from "../services/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Storage.getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export { api };
