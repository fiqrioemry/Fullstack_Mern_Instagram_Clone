import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";

export const useUserStore = create((set, get) => ({
  profile: null,
  followers: [],
  followings: [],
  loading: true,
  error: null,

  getUserProfile: async (username) => {
    set({ loading: true, error: null });
    try {
      const profile = await callApi.getUserProfile(username);
      set({ profile });
    } catch (error) {
      console.log(error);
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  setProfile: (updateData) => {
    set((state) => ({
      profile: { ...state.profile, ...updateData },
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
      followings: state.followings.map((follow) =>
        follow.userId === followingId
          ? { ...follow, isFollow: !follow.isFollow }
          : follow
      ),
    }));
  },

  toggleFollow: async (followingId) => {
    try {
      const message = await callApi.toggleFollow(followingId);
      await get().getFollowings(get().profile.username);
      await get().getUserProfile(get().profile.username);
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
