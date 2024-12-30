import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const usePostStore = create((set) => ({
  success: null,
  message: null,
  followingPosts: [],
  isLoadingPost: false,
  createNewPost: async (formData) => {
    try {
      set({ isLoadingPost: true });
      const response = await axiosInstance.post("/api/post/create", formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingPost: false });
    }
  },

  // get all following post
  getAllFollowingPosts: async () => {
    try {
      set({ isLoadingPost: true });
      const response = await axiosInstance.get("/api/post/followings");
      set({
        followingPosts: response.data.data,
        message: response.data.message,
      });
    } catch (error) {
      console.log(error);
      set({ followingPosts: [] });
    } finally {
      set({ isLoadingPost: false });
    }
  },
}));
