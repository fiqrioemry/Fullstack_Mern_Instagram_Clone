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
}));
