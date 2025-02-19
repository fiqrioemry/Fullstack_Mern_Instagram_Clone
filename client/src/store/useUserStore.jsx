import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { usePostStore } from "./usePostStore";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set, get) => ({
  users: [],
  error: null,
  profile: null,
  followers: [],
  followings: [],
  loading: true,
  searching: false,
  searchTerm: "",

  searchUser: async (username) => {
    if (!username.trim()) return;
    set({ searching: true, users: [], searchTerm: username });

    try {
      const users = await callApi.searchUser(username);
      set({ users });
    } catch (error) {
      set({ users: [], error: error.message });
    } finally {
      set({ searching: false });
    }
  },

  getUserProfile: async (username) => {
    try {
      const profile = await callApi.getUserProfile(username);
      set({ profile });
    } catch (error) {
      set({ profile: [] });
      console.log(error.message);
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
      set({ profile: [] });
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  updateMyProfile: async (formData) => {
    set({ loading: true });
    try {
      const { message } = await callApi.updateMyProfile(formData);
      await get().getMyProfile();
      toast.success(message);
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
  removeFollowings: (followingId) => {
    set((state) => ({
      followings: state.followings.filter(
        (follow) => follow.userId !== followingId
      ),
    }));
  },

  toggleFollow: async (followingId) => {
    try {
      const message = await callApi.toggleFollow(followingId);

      get().setFollowings(followingId);

      get().setFollowers(followingId);

      usePostStore.getState().updatePostsFollowStatus(followingId);

      if (window.location.pathname === "/") {
        usePostStore.getState().removePostsByUserId(followingId);
      }

      set((state) => ({
        profile: {
          ...state.profile,
          isFollowing:
            state.profile.userId === followingId
              ? !state.profile.isFollowing
              : state.profile.isFollowing,
        },
      }));
      if (
        window.location.pathname.includes(useAuthStore.getState().user.username)
      ) {
        get().removeFollowings(followingId);
        set((state) => ({
          profile: {
            ...state.profile,
            followings: Math.max(0, state.profile.followings - 1),
          },
        }));
      }

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
