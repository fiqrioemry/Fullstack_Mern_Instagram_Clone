import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const usePostStore = create((set) => ({
  success: null,
  message: null,
  post: null,
  posts: [],
  followingPosts: [],
  isPostLoading: true,

  createPost: async (formData) => {
    try {
      const response = await axiosInstance.post("/api/post", formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updatePost: async (formData, postId) => {
    try {
      const response = await axiosInstance.put(`/api/post/${postId}`, formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deletePost: async (postId) => {
    try {
      const response = await axiosInstance.delete(`/api/post/${postId}`);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getPublicPosts: async (limit = 10) => {
    try {
      const response = await axiosInstance.delete(
        `/api/post/public?limit=${limit}`
      );
      set({ posts: response.data.data });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({ posts: [] });
    }
  },

  getFollowingPosts: async (limit = 10) => {
    try {
      const response = await axiosInstance.get(
        `/api/post/user/followings?limit=${limit}`
      );
      set({ followingPosts: response.data.data });
    } catch (error) {
      console.log(error);
      set({ followingPosts: [] });
    } finally {
      set({ isPostLoading: false });
    }
  },

  getPostDetail: async (postId) => {
    try {
      const response = await axiosInstance.get(`/api/post/${postId}`);
      set({ post: response.data.data });
    } catch (error) {
      console.log(error);
      set({ post: [] });
    }
  },

  likePost: async (postId) => {
    try {
      const response = await axiosInstance.post(`/api/post/${postId}/like`);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  unlikePost: async (postId) => {
    try {
      const response = await axiosInstance.delete(`/api/post/${postId}/like`);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
