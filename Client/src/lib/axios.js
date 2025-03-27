import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4500",
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("accessToken") || "";
        console.log("accessToken in interceptor:", accessToken);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);
