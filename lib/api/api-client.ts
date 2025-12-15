import { API_BASE_URL } from "@/lib/api/api-constants";
import axios from "axios";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});