import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";
import { useAuthStore } from "./useAuthStore";

export const usePostStore = create((set, get) => ({
  post: null,
  posts: [],
  totalPosts: 0,
  loading: false,
  message: "",

  setPost: (postId) => {
    set((state) => ({
      post: state.posts.find((post) => post.postId === postId) || null,
    }));
  },

  setPosts: (postId) => {
    set((state) => ({
      posts: state.posts.find((post) => post.postId === postId) || null,
    }));
  },

  setDeletedPosts: (postId) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.postId !== postId) || [],
    }));
  },

  removePostsByUserId: (userId) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.userId !== userId),
    }));
  },

  updatePostsFollowStatus: (followingId) => {
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.userId === followingId
          ? { ...post, isFollow: !post.isFollow }
          : post
      );

      return {
        posts: updatedPosts,
        post:
          state.post && state.post.userId === followingId
            ? { ...state.post, isFollow: !state.post.isFollow }
            : state.post,
      };
    });
  },

  commentCount: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.postId === postId ? { ...post, comments: post.comments + 1 } : post
      ),
    }));
  },

  getPublicPosts: async (limit) => {
    set({ loading: true });
    try {
      const { posts, totalPosts } = await callApi.getPublicPosts(limit);
      set({ posts, totalPosts });
    } catch (error) {
      set({ posts: [] });
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getPostDetail: async (postId) => {
    set({ loading: true });
    try {
      const post = await callApi.getPostDetail(postId);
      set({ post });
    } catch (error) {
      set({ post: [] });
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getUserPosts: async (username) => {
    try {
      set({ loading: true });
      const { posts, totalPosts, message } = await callApi.getUserPosts(
        username
      );
      set({ posts, totalPosts, message });
    } catch (error) {
      set({ posts: [] });
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getPostsFromFollowings: async (limit) => {
    set({ loading: true });
    try {
      const { posts, totalPosts, message } =
        await callApi.getPostsFromFollowings(limit);
      set({ posts, totalPosts, message });
    } catch (error) {
      set({ posts: [] });
      console.log(error.message);
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

  createPost: async (formData) => {
    try {
      set({ loading: true });
      const { message } = await callApi.createPost(formData);
      await get().getPublicPosts();

      const username = useAuthStore.getState().user.username;
      await get().getUserPosts(username);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  deletePost: async (postId, navigate) => {
    try {
      set({ loading: true });
      const { message } = await callApi.deletePost(postId);

      const returnPath = useAuthStore.getState().user.username;
      get().setPosts(postId);
      navigate(`/${returnPath}`);
      toast.success(message);
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
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
