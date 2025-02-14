import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  accessToken: null,
  isAuthenticate: null,

  setAccessToken: (accessToken) => set({ accessToken }),

  authCheck: async () => {
    try {
      const user = await callApi.authCheck();
      set({ user, isAuthenticate: true });
    } catch {
      set({ user: null, isAuthenticate: false });
    }
  },

  signin: async (formData) => {
    set({ loading: true });
    try {
      const { message, accessToken } = await callApi.signin(formData);
      set({ accessToken });
      toast.success(message);
      await get().authCheck();
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },

  signup: async (formData) => {
    set({ loading: true });
    try {
      const message = await callApi.signup(formData);
      toast.success(message);
    } catch (error) {
      toast.error(error);
    } finally {
      set({ loading: false });
    }
  },

  signout: async () => {
    try {
      const message = await callApi.signout();
      set({ user: null, isAuthenticate: false, accessToken: null });
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },
}));
