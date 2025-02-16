import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";

export const useUserStore = create((set, get) => ({
  profile: [],
  followers: [],
  followings: [],
  loading: true,

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

  setProfile: () => {
    set((state) => ({
      profile: {
        ...state.profile,
        isFollowing: !state.profile.isFollowing,
      },
    }));
  },

  setFollowers: (followingId) => {
    set((state) => ({
      followers: state.followers.map((follow) =>
        follow.userId === followingId
          ? { ...follow, isFollow: !follow.isFollow }
          : follow
      ),
    }));
  },

  setFollowings: (followingId) => {
    set((state) => ({
      followings: state.followings.map((following) =>
        following.userId === followingId
          ? { ...following, isFollow: !following.isFollow }
          : following
      ),
    }));
  },

  follow: async (followingId) => {
    try {
      const message = await callApi.follow(followingId);
      get().setProfile();
      get().setFollowings(followingId);
      get().setFollowers(followingId);
      toast.success(message);
    } catch (error) {
      toast.error(error);
    }
  },

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
