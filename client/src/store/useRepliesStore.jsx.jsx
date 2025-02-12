import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";

export const useRepliestore = create((set, get) => ({
  replies: [],
  loading: false,

  getReplies: async (postId, commentId) => {
    try {
      set({ loading: true });
      const replies = await callApi.getReplies(postId, commentId);
      set({ replies });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  createReplies: async (formData, postId, commentId) => {
    try {
      const message = await callApi.createReplies(formData, postId, commentId);
      toast.success(message);
      await get().getReplies(postId);
    } catch (error) {
      console.log(error);
    }
  },

  deleteReplies: async (formData, postId) => {
    try {
      const message = await callApi.deleteReplies(formData, postId);
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },
}));
