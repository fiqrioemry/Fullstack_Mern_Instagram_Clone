import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const usePostStore = create((set) => ({
  success: null,
  message: null,
  isLoadingPost: false,

  createNewPost: async (formData) => {
    try {
      set({ isLoadingPost: true });
      const response = await axiosInstance.post("/api/post/create", formData);
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingPost: false });
    }
  },
}));
