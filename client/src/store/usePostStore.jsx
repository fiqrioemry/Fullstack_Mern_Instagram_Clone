import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";

export const usePostStore = create((set) => ({
  post: null,
  posts: [],
  totalPosts: 0,
  loading: true,

  setPost: (postId) => {
    set((state) => ({
      post: state.posts.find((post) => post.postId === postId) || null,
    }));
  },

  commentCount: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.postId === postId ? { ...post, comments: post.comments + 1 } : post
      ),
    }));
  },

  getPublicPosts: async (limit) => {
    console.log(limit);
    try {
      const { posts, totalPosts } = await callApi.getPublicPosts(limit);
      set({ posts, totalPosts });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  getPostDetail: async (postId) => {
    try {
      const post = await callApi.getPostDetail(postId);
      set({ post });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: true });
    }
  },

  getUserPosts: async (username) => {
    try {
      const posts = await callApi.getUserPosts(username);
      set({ posts });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },

  getPostsFromFollowings: async (limit) => {
    try {
      const { posts, totalPosts } = await callApi.getPostsFromFollowings(limit);
      set({ posts, totalPosts });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
