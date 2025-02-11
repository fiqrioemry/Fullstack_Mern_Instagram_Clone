import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../services/callApi";

export const useUserStore = create((set, get) => ({
  profile: [],
  followers: [],
  followings: [],
  recommended: [],
  loading: false,

  // 🔹 Get User Profile
  getUserProfile: async (username) => {
    set({ loading: true });
    try {
      const profile = await callApi.getUserProfile(username);
      set({ profile });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },
  getMyProfile: async () => {
    set({ loading: true });
    try {
      const profile = await callApi.getMyProfile();
      set({ profile });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },
  // 🔹 Update User Profile
  updateMyProfile: async (formData) => {
    set({ loading: true });
    try {
      const message = await callApi.updateMyProfile(formData);
      await get().getMyProfile();
      toast.success(message);
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Follow User
  followUser: async (followingId) => {
    set({ loading: true });
    try {
      const message = await callApi.followUser(followingId);
      await get().getFollowings();
      toast.success(message);
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Unfollow User
  unfollowUser: async (followingId) => {
    set({ loading: true });
    try {
      const message = await callApi.unfollowUser(followingId);
      await get().getFollowings();
      toast.success(message);
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Get Followers
  getFollowers: async (username) => {
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
  getFollowings: async (username) => {
    set({ loading: true });
    try {
      const followings = await callApi.getFollowings(username);
      set({ followings });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
