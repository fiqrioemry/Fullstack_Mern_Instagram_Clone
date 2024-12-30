import { create } from "zustand";
import { axiosInstance } from "@/services";
import toast from "react-hot-toast";

export const useFollowStore = create((set) => ({
  success: null,
  message: null,
  recommendUsers: [],
  isFollowLoading: true,

  getFollowRecommendations: async () => {
    try {
      const response = await axiosInstance.get(
        "/api/user/recommend/follow/user"
      );
      set({
        recommendUsers: response.data.data,
      });
    } catch (error) {
      console.log(error);
      set({ recommendUsers: [] });
    } finally {
      set({ isFollowLoading: false });
    }
  },

  followNewUser: async ({ followingId }) => {
    try {
      set({ isFollowLoading: true });
      const response = await axiosInstance.get("/api/user/follow", {
        followingId,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isFollowLoading: false });
    }
  },

  getAllFollowings: async () => {
    try {
      set({ isFollowLoading: true });
      const response = await axiosInstance.get("/api/user/unfollow", {
        followingId,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isFollowLoading: false });
    }
  },

  getAllFollowers: async () => {
    try {
      set({ isFollowLoading: true });
      const response = await axiosInstance.get("/api/user/unfollow", {
        followingId,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isFollowLoading: false });
    }
  },

  unfollowUser: async ({ followingId }) => {
    try {
      set({ isFollowLoading: true });
      const response = await axiosInstance.get("/api/user/unfollow", {
        followingId,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isFollowLoading: false });
    }
  },
}));
