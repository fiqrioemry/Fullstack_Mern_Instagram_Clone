import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../api/callApi";

export const useAuthStore = create((set, get) => ({
  step: 1,
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
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  resendOTP: async (email) => {
    try {
      const message = await callApi.sendOTP(email);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    }
  },

  signup: async (formData, navigate) => {
    set({ loading: true });
    console.log(formData);
    try {
      const step = get().step;

      if (step === 1) {
        const message = await callApi.sendOTP(formData);
        toast.success(message);
        set({ step: 2 });
      } else if (step === 2) {
        const message = await callApi.verifyOTP(formData);
        toast.success(message);
        set({ step: 3 });
      } else if (step === 3) {
        const message = await callApi.signup(formData);
        toast.success(message);
        set({ step: 1 });
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.message);
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
