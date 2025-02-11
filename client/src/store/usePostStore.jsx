import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";
import callApi from "../services/callApi";

export const usePostStore = create((set) => ({
  success: null,
  post: [],
  posts: [],
  message: null,
  loading: false,

  // 🔹 Get User Posts
  getUserPosts: async (username) => {
    set({ loading: true });
    try {
      const posts = await callApi.getUserPosts(username);
      set({ posts });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },

  getPublicPosts: async () => {
    set({ loading: true });
    try {
      const posts = await callApi.getPublicPosts();
      set({ posts });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  createPost: async (formData) => {
    set({ loading: true });
    try {
      const message = await callApi.createPost(formData);
      toast.success(message);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  updatePost: async (formData, postId) => {
    set({ loading: true });
    try {
      const message = await callApi.updatePost(formData, postId);
      toast.success(message);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  deletePost: async (postId) => {
    set({ loading: true });
    try {
      const message = await callApi.deletePost(postId);
      toast.success(message);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  getPublicPosts: async (limit = 10) => {
    try {
      const response = await axiosInstance.get(
        `/api/post/public?limit=${limit}`
      );
      set({ posts: response.data.data });
    } catch (error) {
      console.log(error);
      set({ posts: [] });
    }
  },

  getFollowingPosts: async (limit = 5) => {
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
