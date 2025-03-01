import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useUserStore = create((set) => ({
  users: [],
  error: null,
  profile: null,
  follows: null,
  loading: false,
  searching: false,

  searchUser: async (username) => {
    if (!username.trim()) return;
    set({ searching: true });
    try {
      const users = await callApi.searchUser(username);
      set({ users });
    } catch (error) {
      set({ users: [], error: error.message });
    } finally {
      set({ searching: false });
    }
  },

  getFollowers: async (username) => {
    set({ follows: null });
    try {
      const followers = await callApi.getFollowers(username);
      set({ follows: followers });
    } catch (error) {
      toast.error(error.message);
    }
  },

  getFollowings: async (username) => {
    set({ follows: null });
    try {
      const followings = await callApi.getFollowings(username);
      set({ follows: followings });
    } catch (error) {
      toast.error(error);
    }
  },

  getUserProfile: async (username) => {
    try {
      const profile = await callApi.getUserProfile(username);
      set({ profile });
    } catch (error) {
      set({ profile: [] });
      console.log(error.message);
    }
  },

  getMyProfile: async () => {
    try {
      const profile = await callApi.getMyProfile();
      set({ profile });
    } catch (error) {
      set({ profile: [] });
      console.log(error.message);
    }
  },

  updateProfile: async (formData) => {
    set({ loading: true });
    try {
      const { message, profile } = await callApi.updateProfile(formData);
      toast.success(message);
      set({ profile });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  setProfile: (updateData) => {
    set((state) => ({
      profile: { ...state.profile, ...updateData },
    }));
  },

  setFollows: (followingId) => {
    set((state) => ({
      follows: state.follows.map((follow) =>
        follow.userId === followingId
          ? { ...follow, isFollow: !follow.isFollow }
          : follow
      ),
    }));
  },

  removeFollowings: (followingId) => {
    set((state) => ({
      follows: state.follows.filter((follow) => follow.userId !== followingId),
    }));
  },

  // for another user profile
  setCountFollowers: () => {
    set((state) => ({
      profile: {
        ...state.profile,
        followers:
          state.profile.followers + (state.profile.isFollowing ? -1 : 1),
        isFollowing: !state.profile.isFollowing,
      },
    }));
  },

  setCountFollowings: (value) => {
    set((state) => ({
      profile: {
        ...state.profile,
        followings: state.profile.followings + value,
        isFollowing: !state.profile.isFollowing,
      },
    }));
  },

  toggleFollow: async (followingId) => {
    try {
      const message = await callApi.toggleFollow(followingId);
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },
}));
