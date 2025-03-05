import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";
import { usePostStore } from "./usePostStore";

export const useCommentStore = create((set, get) => ({
  loading: {},
  replies: {},
  comments: [],
  totalComments: 0,
  selectedComment: null,

  setReplies: (replies, commentId) => {
    set((state) => ({
      replies: { ...state.replies, [commentId]: replies },
    }));
  },

  createReply: async (formData, postId) => {
    const comment = get().selectedComment;
    const commentId = comment?.parentId || comment.commentId;
    try {
      const { message } = await callApi.createReply(
        formData,
        postId,
        commentId
      );

      await get().getReplies({ postId: comment.postId, commentId });
      toast.success(message);
    } catch (error) {
      console.log(error.message);
    }
  },

  getReplies: async (comment, limit) => {
    const { postId, commentId } = comment;
    try {
      set((state) => ({
        loading: { ...state.loading, [commentId]: true },
      }));
      const { replies } = await callApi.getReplies(postId, commentId, limit);
      get().setReplies(replies, commentId);
    } catch (error) {
      console.log(error.message);
    } finally {
      set((state) => ({
        loading: { ...state.loading, [commentId]: false },
      }));
    }
  },

  setSelectedComment: (selectedComment) => {
    set({ selectedComment });
  },

  createComment: async (formData, postId) => {
    try {
      const { message } = await callApi.createComment(formData, postId);
      usePostStore.getState().commentCount(postId);

      const limit = get().comments.length + 1;
      await get().getComments(postId, limit);
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },

  getComments: async (postId, limit) => {
    try {
      set((state) => ({
        loading: { ...state.loading, [postId]: true },
      }));
      const { comments, totalComments } = await callApi.getComments(
        postId,
        limit
      );

      set({ comments, totalComments });
    } catch (error) {
      console.log(error.message);
    } finally {
      set((state) => ({
        loading: { ...state.loading, [postId]: false },
      }));
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

  likeComment: async (commentId, parentId = null) => {
    try {
      const { message } = await callApi.likeComment(commentId);

      if (parentId) {
        get().setLikeReply(commentId, parentId);
      } else {
        get().setLikeComment(commentId);
      }
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },

  setLikeReply: (commentId, parentId) => {
    set((state) => {
      const parentReplies = state.replies[parentId] || [];

      return {
        replies: {
          ...state.replies,
          [parentId]: parentReplies.map((reply) =>
            reply.commentId === commentId
              ? {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                }
              : reply
          ),
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
