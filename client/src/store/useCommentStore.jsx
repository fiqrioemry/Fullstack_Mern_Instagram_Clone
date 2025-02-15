import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";
import { usePostStore } from "./usePostStore";

export const useCommentStore = create((set, get) => ({
  replies: {},
  comments: [],
  loadingReply: {},
  loadingComment: false,

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

  createComment: async (formData, postId) => {
    try {
      const message = await callApi.createComment(formData, postId);
      toast.success(message);
      await get().getComments(postId);
      await usePostStore.getState().commentCount(postId);
      await get().getReplies(postId, formData.parentId);
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

  likeComment: async (commentId) => {
    try {
      const message = await callApi.likePost(commentId);
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },
}));
