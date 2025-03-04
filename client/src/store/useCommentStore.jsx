import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";
import { usePostStore } from "./usePostStore";

export const useCommentStore = create((set, get) => ({
  loading: {},
  replies: {},
  comments: [],
  totalReplies: {},
  totalComments: 0,
  selectedComment: null,

  setReplies: (replies, commentId, totalReplies) => {
    set((state) => ({
      replies: { ...state.replies, [commentId]: replies },
      totalReplies: { ...state.totalReplies, [commentId]: totalReplies },
    }));
  },

  getReplies: async (comment) => {
    const { postId, commentId } = comment;
    try {
      set((state) => ({
        loading: { ...state.loading, [commentId]: true },
      }));

      const { replies, totalReplies } = await callApi.getReplies(
        postId,
        commentId
      );
      get().setReplies(replies, commentId, totalReplies);
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

  setComments: (comment) => {
    set((state) => ({
      comments: { ...state.comments, comment },
    }));
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

  createComment: async (formData, postId) => {
    try {
      const { comment, message } = await callApi.createComment(
        formData,
        postId
      );
      await usePostStore.getState().commentCount(postId);
      get().setComments(comment);
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },

  createReply: async (formData, postId) => {
    const commentId = get().selectedComment.commentId;
    try {
      const { reply, message } = await callApi.createReply(
        formData,
        postId,
        commentId
      );
      get().setReplies(reply, commentId);
      toast.success(message);
    } catch (error) {
      console.log(error.message);
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
      const { message } = await callApi.likeComment(commentId);
      toast.success(message);
      get().setLikeComment(commentId);
    } catch (error) {
      console.log(error);
    }
  },

  likeReply: async (commentId, parentId) => {
    try {
      const { message } = await callApi.likeComment(commentId);
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
