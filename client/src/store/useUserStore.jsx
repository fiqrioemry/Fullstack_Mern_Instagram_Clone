import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../services/callApi";

export const useUserStore = create((set, get) => ({
  followings: [],
  followers: [],
  posts: [],
  profile: null,
  recommended: [],
  loading: false,

  // 🔹 Get User Profile
  fetchUserProfile: async (username) => {
    set({ loading: true });
    try {
      const profile = await callApi.getUserProfile(username);
      set({ profile });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Update User Profile
  updateUserProfile: async (formData) => {
    set({ loading: true });
    try {
      const updatedProfile = await callApi.updateUserProfile(formData);
      set({ profile: updatedProfile });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Get User Posts
  fetchUserPosts: async (username) => {
    set({ loading: true });
    try {
      const posts = await callApi.getUserPosts(username);
      set({ posts });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Follow User
  followUser: async (followingId) => {
    set({ loading: true });
    try {
      await callApi.followUser(followingId);
      await get().fetchFollowings(); // Update followings list
      toast.success("Followed successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Unfollow User
  unfollowUser: async (followingId) => {
    set({ loading: true });
    try {
      await callApi.unfollowUser(followingId);
      await get().fetchFollowings(); // Update followings list
      toast.success("Unfollowed successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Get Followers
  fetchFollowers: async (username) => {
    set({ loading: true });
    try {
      const followers = await callApi.getFollowers(username);
      set({ followers });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Get Followings
  fetchFollowings: async (username) => {
    set({ loading: true });
    try {
      const followings = await callApi.getFollowings(username);
      set({ followings });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Get Recommended Follow
  fetchFollowRecommend: async () => {
    set({ loading: true });
    try {
      const recommended = await callApi.getFollowRecommend();
      set({ recommended });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
