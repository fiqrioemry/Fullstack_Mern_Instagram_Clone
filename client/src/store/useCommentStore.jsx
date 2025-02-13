import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";

export const useCommentStore = create((set, get) => ({
  replies: {},
  comments: [],
  loadingReply: {},
  loadingComment: false,
  activePostId: null,
  activeInput: { commentId: null, content: "" },

  setInput: (postId, commentId = null, username = "") => {
    set({
      activePostId: postId,
      activeInput: { commentId, content: username ? `@${username} ` : "" },
    });
  },
  getComments: async (postId) => {
    try {
      set({ loadingComment: true });

      const comments = await callApi.getComments(postId);
      set({ comments });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingComment: false });
    }
  },

  getReplies: async (postId, commentId) => {
    try {
      set((state) => ({
        loadingReply: { ...state.loading, [commentId]: true },
      }));

      const replies = await callApi.getReplies(postId, commentId);

      set((state) => ({
        replies: { ...state.replies, [commentId]: replies },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set((state) => ({
        loadingReply: { ...state.loading, [commentId]: false },
      }));
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

  createComment: async (formData, postId) => {
    try {
      const message = await callApi.createComment(formData, postId);
      toast.success(message);
      await get().getComments(postId);
    } catch (error) {
      console.log(error);
    }
  },

  deleteComment: async (formData, postId) => {
    try {
      const message = await callApi.deleteComment(formData, postId);
      toast.success(message);
      await get().getComments(postId);
    } catch (error) {
      console.log(error);
    }
  },
}));
