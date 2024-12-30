import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const usePostStore = create((set) => ({
  success: null,
  message: null,
  followingPosts: [],
  isPostLoading: true,
  createNewPost: async (formData) => {
    try {
      const response = await axiosInstance.post("/api/post/create", formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isPostLoading: false });
    }
  },

  // get all following post
  getAllFollowingPosts: async () => {
    try {
      const response = await axiosInstance.get("/api/post/followings");
      set({
        followingPosts: response.data.data,
        message: response.data.message,
      });
    } catch (error) {
      console.log(error);
      set({ followingPosts: [] });
    } finally {
      set({ isPostLoading: false });
    }
  },
}));
