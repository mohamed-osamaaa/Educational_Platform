import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4500",
    withCredentials: true,
});
