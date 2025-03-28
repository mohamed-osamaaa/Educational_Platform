import toast from "react-hot-toast";
import { create } from "zustand";

import { axiosInstance } from "../lib/axios.js";

export const useCourseStore = create((set, get) => ({
    courses: [],
    isLoading: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,

    // Fetch all courses based on courseType (1, 2, 3)
    fetchCourses: async (courseType) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get(`/courses/all/${courseType}`);
            set({ courses: res.data.data });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch courses"
            );
        } finally {
            set({ isLoading: false });
        }
    },

    addCourse: async (courseData, courseType) => {
        set({ isAdding: true });
        try {
            const formData = new FormData();
            Object.keys(courseData).forEach((key) => {
                formData.append(key, courseData[key]);
            });

            const res = await axiosInstance.post(
                `/courses/add/${courseType}`,
                formData
            );
            set((state) => ({ courses: [...state.courses, res.data.data] }));
            toast.success("Course added successfully!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add course"
            );
        } finally {
            set({ isAdding: false });
        }
    },

    updateCourse: async (id, courseType, updatedData) => {
        set({ isUpdating: true });
        try {
            const res = await axiosInstance.put(
                `/courses/${courseType}/${id}`,
                updatedData
            );
            set((state) => ({
                courses: state.courses.map((course) =>
                    course._id === id ? res.data.data : course
                ),
            }));
            toast.success("Course updated successfully!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update course"
            );
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteCourse: async (id, courseType) => {
        set({ isDeleting: true });
        try {
            await axiosInstance.delete(`/courses/${courseType}/${id}`);
            set((state) => ({
                courses: state.courses.filter((course) => course._id !== id),
            }));
            toast.success("Course deleted successfully!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete course"
            );
        } finally {
            set({ isDeleting: false });
        }
    },
}));
