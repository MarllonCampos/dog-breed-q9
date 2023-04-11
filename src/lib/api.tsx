import axios from "axios";
import { Storage } from "../services/storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: Storage.getToken(),
  },
});
