import { create } from "zustand";
import Cookies from "js-cookies";
import toast from "react-hot-toast";
import { axiosInstance } from "@/services";

export const usePostStore = create((set) => ({
  isAuthLoading: null,
  isUserAuth: null,
  userData: null,

  userSignUp: async (formData) => {
    try {
      set({ isAuthLoading: true });
      const response = await axiosInstance.post("/api/auth/signup", formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAuthLoadingPost: false });
    }
  },

  userSignIn: async (formData) => {
    try {
      set({ isAuthLoading: true });
      const response = await axiosInstance.post("/api/auth/signin", formData);
      toast.success(response.data.message);

      Cookies.set("accessToken", response.data.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        expires: 1 / 48,
      });

      set({ userData: response.data.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    } finally {
      set({ isAuthLoading: false });
    }
  },
}));
