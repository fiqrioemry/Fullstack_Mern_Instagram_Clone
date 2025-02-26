import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  step: 1,
  user: null,
  loading: false,
  accessToken: null,
  checkingAuth: true,
  onlineUsers: [],
  socket: null,

  setAccessToken: (accessToken) => set({ accessToken }),

  authCheck: async () => {
    try {
      const user = await callApi.authCheck();
      set({ user });
    } catch {
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
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

  signout: async () => {
    try {
      set({ loading: true });
      const message = await callApi.signout();
      set({ user: null, accessToken: null });
      toast.success(message);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
