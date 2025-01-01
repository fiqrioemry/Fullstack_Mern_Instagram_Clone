import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const useCommentStore = create((set) => ({
  success: null,
  message: null,
  comments: [],
  replies: [],
  isCommentLoading: true,
  isRepliesLoading: true,

  getComments: async (postId) => {
    try {
      const response = await axiosInstance.get(`/api/post/${postId}/comments`);
      set({ comments: response.data.data });
    } catch (error) {
      console.log(error);
      set({ comments: [] });
    } finally {
      set({ isCommentLoading: false });
    }
  },

  addComment: async (postId, commentData) => {
    try {
      const response = await axiosInstance.post(
        `/api/post/${postId}/comments`,
        commentData
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isCommentLoading: false });
    }
  },
}));
