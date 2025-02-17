import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";

export const usePostStore = create((set, get) => ({
  post: null,
  posts: [],
  totalPosts: 0,
  loading: true,
  error: null,
  message: "",

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
    set({ loading: true, error: null });
    try {
      const { posts, totalPosts } = await callApi.getPublicPosts(limit);
      set({ posts, totalPosts });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getPostDetail: async (postId) => {
    set({ loading: true, error: null });
    try {
      const post = await callApi.getPostDetail(postId);
      set({ post });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getUserPosts: async (username) => {
    try {
      set({ loading: true, error: null });
      const { posts, totalPosts, message } = await callApi.getUserPosts(
        username
      );
      set({ posts, totalPosts, message });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getPostsFromFollowings: async (limit) => {
    set({ loading: true, error: null });
    try {
      const { posts, totalPosts, message } =
        await callApi.getPostsFromFollowings(limit);
      set({ posts, totalPosts, message });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  likePost: async (postId) => {
    try {
      const { message } = await callApi.likePost(postId);
      toast.success(message);
      get().setLike(postId);
    } catch (error) {
      console.log(error.message);
    }
  },

  setLike: (postId) => {
    set((state) => ({
      post:
        state.post?.postId === postId
          ? {
              ...state.post,
              isLiked: !state.post.isLiked,
              likes: state.post.isLiked
                ? state.post.likes - 1
                : state.post.likes + 1,
            }
          : state.post,

      posts: state.posts.map((post) =>
        post.postId === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      ),
    }));
  },
}));
