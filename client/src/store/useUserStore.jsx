import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";

export const useUserStore = create((set, get) => ({
  search: [],
  profile: [],
  followers: [],
  followings: [],
  recommended: [],
  searching: false,
  loading: {},

  // 🔹 Get User Profile
  searchUser: async (username) => {
    set({ searching: true });
    try {
      const search = await callApi.searchUser(username);
      set({ search });
    } catch (error) {
      console.log(error);
    } finally {
      set({ searching: false });
    }
  },

  // 🔹 Get User Profile
  getUserProfile: async (username) => {
    set((state) => ({
      loading: { ...state.loading, [username]: true },
    }));
    try {
      const profile = await callApi.getUserProfile(username);
      set({ profile });
    } catch (error) {
      toast.error(error);
    } finally {
      set((state) => ({
        loading: { ...state.loading, [username]: false },
      }));
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
    set((state) => ({
      loading: { ...state.loading, [followingId]: true },
    }));
    try {
      const { message, followings } = await callApi.unfollowUser(followingId);
      await get().getFollowings(followings.username);
      toast.success(message);
    } catch (error) {
      toast.error(error);
    } finally {
      set((state) => ({
        loading: { ...state.loading, [followingId]: false },
      }));
    }
  },

  // 🔹 Unfollow User
  unfollowUser: async (followingId) => {
    set((state) => ({
      loading: { ...state.loading, [followingId]: true },
    }));
    try {
      const { message, followings } = await callApi.unfollowUser(followingId);
      await get().getFollowings(followings.username);
      toast.success(message);
    } catch (error) {
      toast.error(error);
    } finally {
      set((state) => ({
        loading: { ...state.loading, [followingId]: false },
      }));
    }
  },

  // 🔹 Get Followers
  getFollowers: async (username) => {
    set((state) => ({
      loading: { ...state.loading, [username]: true },
    }));
    try {
      const followers = await callApi.getFollowers(username);
      set({ followers });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set((state) => ({
        loading: { ...state.loading, [username]: false },
      }));
    }
  },

  // 🔹 Get Followings
  getFollowings: async (username) => {
    set((state) => ({
      loading: { ...state.loading, [username]: true },
    }));
    try {
      const followings = await callApi.getFollowings(username);
      set({ followings });
    } catch (error) {
      toast.error(error);
    } finally {
      set((state) => ({
        loading: { ...state.loading, [username]: false },
      }));
    }
  },
}));
