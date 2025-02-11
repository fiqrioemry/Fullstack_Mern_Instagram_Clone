import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../services/callApi";

export const usePostStore = create((set, get) => ({
  post: [],
  posts: [],
  comments: [],
  loading: false,

  getPostDetail: async (postId) => {
    set({ loading: true });
    try {
      const post = await callApi.getPostDetail(postId);
      set({ post });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

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
  // this one for feed
  getPostsFromFollowings: async () => {
    set({ loading: true });
    try {
      const posts = await callApi.getPostsFromFollowings();
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

  likePost: async (postId) => {
    try {
      const message = await callApi.likePost(postId);
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },

  unlikePost: async (postId) => {
    try {
      const message = await callApi.unlikePost(postId);
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },

  getComments: async (postId) => {
    try {
      const comments = await callApi.getComments(postId);
      set({ comments });
    } catch (error) {
      console.log(error);
    }
  },

  createComment: async (formData, postId) => {
    try {
      const message = await callApi.getComments(formData, postId);
      toast.success(message);
      await get().getComments(postId);
    } catch (error) {
      console.log(error);
    }
  },
}));
