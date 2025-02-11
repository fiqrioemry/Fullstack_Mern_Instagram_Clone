import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../services/callApi";

export const useCommentStore = create((set, get) => ({
  replies: [],
  comments: [],
  loading: true,

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
