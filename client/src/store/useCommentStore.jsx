import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";
import { usePostStore } from "./usePostStore";

export const useCommentStore = create((set, get) => ({
  replies: {},
  comments: [],
  loadingReply: {},
  totalReplies: 0,
  totalComments: 0,
  loadingComment: false,

  getComments: async (postId) => {
    try {
      set({ loadingComment: true });
      const { comments, totalComments } = await callApi.getComments(postId);
      set({ comments, totalComments });
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
      const message = await callApi.likeComment(commentId);
      toast.success(message);
      get().setLikeComment(commentId);
    } catch (error) {
      console.log(error);
    }
  },

  likeReply: async (commentId, parentId) => {
    try {
      const message = await callApi.likeComment(commentId);
      toast.success(message);
      get().setLikeReply(commentId, parentId);
    } catch (error) {
      console.log(error);
    }
  },

  setLikeReply: (commentId, parentId) => {
    set((state) => {
      const parentReplies = state.replies[parentId]?.replies || [];
      return {
        replies: {
          ...state.replies,
          [parentId]: {
            ...state.replies[parentId],
            replies: parentReplies.map((reply) =>
              reply.commentId === commentId
                ? {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  }
                : reply
            ),
          },
        },
      };
    });
  },

  setLikeComment: (commentId) => {
    set((state) => ({
      comment:
        state.comment?.commentId === commentId
          ? {
              ...state.comment,
              isLiked: !state.comment.isLiked,
              likes: state.comment.isLiked
                ? state.comment.likes - 1
                : state.comment.likes + 1,
            }
          : state.comment,

      comments: state.comments.map((comment) =>
        comment.commentId === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      ),
    }));
  },
}));
