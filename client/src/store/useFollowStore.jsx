import { create } from "zustand";
import { axiosInstance } from "@/services";

export const useFollowStore = create((set) => ({
  success: null,
  message: null,
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
}));
