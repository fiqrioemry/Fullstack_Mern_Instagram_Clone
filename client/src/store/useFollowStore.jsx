import { create } from "zustand";
import { axiosInstance } from "@/services";
import toast from "react-hot-toast";

export const useFollowStore = create((set) => ({
  success: null,
  message: null,
  followings: [],
  followers: [],
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

  followNewUser: async (followingId) => {
    try {
      console.log(followingId);
      set({ isFollowLoading: true });
      const response = await axiosInstance.post("/api/user/follow", {
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

  getAllFollowings: async ({ userId }) => {
    try {
      const response = await axiosInstance.get("/api/user/followings", {
        userId,
      });
      set({ followings: response.data.data });
    } catch (error) {
      console.log(error);
    }
  },

  getAllFollowers: async ({ userId }) => {
    try {
      const response = await axiosInstance.get("/api/user/followers", {
        userId,
      });
      set({ followers: response.data.data });
    } catch (error) {
      console.log(error);
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
