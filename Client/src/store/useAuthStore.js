import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            authUser: JSON.parse(localStorage.getItem("auth-storage")) || null,
            isSigningUp: false,
            isLoggingIn: false,
            isCheckingAuth: true,

            checkAuth: async () => {
                try {
                    const res = await axiosInstance.get("/auth/check-auth");
                    set({ authUser: res.data });
                } catch (error) {
                    console.log("Error in checkAuth:", error);
                    set({ authUser: get().authUser || null });
                } finally {
                    set({ isCheckingAuth: false });
                }
            },

            register: async (data) => {
                set({ isSigningUp: true });
                try {
                    const res = await axiosInstance.post(
                        "/auth/register",
                        data
                    );
                    set({ authUser: res.data });
                    localStorage.setItem(
                        "auth-storage",
                        JSON.stringify(res.data)
                    );
                    toast.success("Account created successfully");
                } catch (error) {
                    toast.error(
                        error.response?.data?.message || "Registration failed"
                    );
                } finally {
                    set({ isSigningUp: false });
                }
            },

            login: async (data) => {
                set({ isLoggingIn: true });
                try {
                    const res = await axiosInstance.post("/auth/login", data);
                    set({ authUser: res.data });
                    localStorage.setItem(
                        "auth-storage",
                        JSON.stringify(res.data)
                    );
                    toast.success("Logged in successfully");
                } catch (error) {
                    toast.error(
                        error.response?.data?.message || "Login failed"
                    );
                } finally {
                    set({ isLoggingIn: false });
                }
            },

            logout: async () => {
                try {
                    // await axiosInstance.post("/auth/logout");
                    set({ authUser: null });
                    localStorage.removeItem("auth-storage");
                    toast.success("Logged out successfully");
                } catch (error) {
                    toast.error(
                        error.response?.data?.message || "Logout failed"
                    );
                }
            },
        }),
        {
            name: "auth-storage", // Key for localStorage
            getStorage: () => localStorage, // Use localStorage to persist state
        }
    )
);
