import { create } from "zustand";
import { axiosInstance } from "@/services";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  followings: null,
  followers: null,
  userPosts: null,
  userProfile: null,
  recommend: null,
  isUserLoading: false,
  message: null,

  followUser: async (followingId) => {
    try {
      set({ isUserLoading: true });
      const response = await axiosInstance.post(
        `/api/user/${followingId}/follow`
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  unfollowUser: async (followingId) => {
    try {
      set({ isUserLoading: true });
      const response = await axiosInstance.delete(
        `/api/user/${followingId}/follow`
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  // Get followers of a user
  getFollowers: async (username) => {
    try {
      set({ isUserLoading: true });
      console.log(username);
      const response = await axiosInstance.get(
        `/api/user/${username}/followers`
      );
      set({ followers: response.data.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  // Get followings of a user
  getFollowings: async (username) => {
    try {
      set({ isUserLoading: true });
      const response = await axiosInstance.get(
        `/api/user/${username}/followings`
      );
      set({ followings: response.data.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  // Get user profile
  getUserProfile: async (username) => {
    try {
      const response = await axiosInstance.get(`/api/user/${username}`);
      set({ userProfile: response.data.data });
    } catch (error) {
      console.error(error);
      set({ userProfile: [] });
    }
  },

  // Update user profile
  updateUserProfile: async (formData) => {
    try {
      set({ isUserLoading: true });
      const response = await axiosInstance.put(`/api/user`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      set({ userProfile: response.data.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  // Get user's posts
  getUserPosts: async (username) => {
    try {
      const response = await axiosInstance.get(`/api/user/${username}/posts`);
      set({ userPosts: response.data.data });
    } catch (error) {
      console.error(error);
      set({ userPosts: [] });
    }
  },

  // Get follow recommendations
  getFollowRecommend: async () => {
    try {
      set({ isRecommendLoading: true });
      const response = await axiosInstance.get(`/api/user/recommend/follow`);
      set({ recommend: response.data.data });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to load recommendations"
      );
    } finally {
      set({ isRecommendLoading: false });
    }
  },
}));
