import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "../services/callApi";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticate: null,
      loading: false,

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
          const message = await callApi.signin(formData);
          await get().authCheck();
          toast.success(message);
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
          set({ user: [], isAuthenticate: false });
          toast.success(message);
        } catch (error) {
          console.log(error);
        }
      },

      refreshToken: async () => {
        try {
          const token = await callApi.refreshToken();
          toast.success(token.message);
          return token;
        } catch (error) {
          console.log(error.message);
        }
      },

      resetPassword: async (token, formData, navigate) => {
        try {
          const data = await callApi.resetPassword(token, formData);
          toast.success(data.message);
          navigate("/login");
        } catch (error) {
          console.log(error.message);
        }
      },

      createStore: async (formData) => {
        try {
          const data = await callApi.createStore(formData);
          toast.success(data.message);
        } catch (error) {
          toast.error(error.message);
        }
      },
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
      partialize: (state) => ({
        user: state.user,
        isAuthenticate: state.isAuthenticate,
        loading: state.loading,
      }),
    }
  )
);
