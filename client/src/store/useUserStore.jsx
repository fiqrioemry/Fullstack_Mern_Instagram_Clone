import { create } from "zustand";
import { axiosInstance } from "@/services";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  followings: [],
  followers: [],
  userPosts: [],
  userProfile: [],
  recommend: [],
  isFollowLoading: false,
  isProfileLoading: false,
  message: null,

  followUser: async (followingId) => {
    try {
      set({ isFollowLoading: true });
      const response = await axiosInstance.post(
        `/api/user/${followingId}/follow`
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isFollowLoading: false });
    }
  },

  unfollowUser: async (followingId) => {
    try {
      set({ isFollowLoading: true });
      const response = await axiosInstance.delete(
        `/api/user/${followingId}/follow`
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isFollowLoading: false });
    }
  },

  // Get followers of a user
  getFollowers: async (userId) => {
    try {
      set({ isFollowLoading: true });
      const response = await axiosInstance.get(`/api/user/${userId}/followers`);
      set({ followers: response.data.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load followers");
    } finally {
      set({ isFollowLoading: false });
    }
  },

  // Get followings of a user
  getFollowings: async (userId) => {
    try {
      set({ isFollowLoading: true });
      const response = await axiosInstance.get(
        `/api/user/${userId}/followings`
      );
      set({ followings: response.data.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isFollowLoading: false });
    }
  },

  // Get user profile
  getUserProfile: async (username) => {
    try {
      set({ isProfileLoading: true });
      const response = await axiosInstance.get(`/api/user/${username}`);
      set({ userProfile: response.data.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      set({ isProfileLoading: false });
    }
  },

  // Update user profile
  updateUserProfile: async (formData) => {
    try {
      set({ isProfileLoading: true });
      const response = await axiosInstance.put(`/api/user`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      set({ userProfile: response.data.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isProfileLoading: false });
    }
  },

  // Get user's posts
  getUserPosts: async (username) => {
    try {
      set({ isPostsLoading: true });
      const response = await axiosInstance.get(`/api/user/${username}/posts`);
      set({ userPosts: response.data.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load posts");
    } finally {
      set({ isPostsLoading: false });
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
