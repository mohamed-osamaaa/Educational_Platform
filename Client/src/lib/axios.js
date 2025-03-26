import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4500",
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const authUser = JSON.parse(localStorage.getItem("auth-storage"));
    if (authUser?.accessToken) {
        config.headers.Authorization = `Bearer ${authUser.accessToken}`;
    }
    return config;
});
