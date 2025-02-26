import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { io } from "socket.io-client";
import { initializeSocket } from "../socket/socket";

const BASE_URL =
  import.meta.env.VITE_BASE_URL === "development"
    ? "http://localhost:5000"
    : "/";

export const useAuthStore = create((set, get) => ({
  step: 1,
  user: null,
  loading: false,
  accessToken: null,
  isAuthenticate: null,
  onlineUsers: [],
  socket: null,

  setAccessToken: (accessToken) => set({ accessToken }),

  authCheck: async () => {
    try {
      const user = await callApi.authCheck();
      set({ user, isAuthenticate: true });
      get().connectSocket();
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

  signout: async () => {
    try {
      const message = await callApi.signout();
      set({ user: null, isAuthenticate: false, accessToken: null });
      get().disconnectSocket();
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },

  connectSocket: () => {
    if (!get().user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: get().user.userId },
    });

    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      console.log("Socket connected:", socket.id);
      console.log("Online Users:", userIds);
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
