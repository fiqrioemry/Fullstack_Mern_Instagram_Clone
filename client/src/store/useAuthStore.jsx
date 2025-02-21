import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { io } from "socket.io-client";

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
      await get().authCheck(); // ✅ Auth check setelah login
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
      get().disconnectSocket(); // ✅ Matikan koneksi socket saat logout
      toast.success(message);
    } catch (error) {
      console.log(error);
    }
  },

  connectSocket: () => {
    const { user, socket } = get();

    if (!user || (socket && socket.connected)) return; // ✅ Hindari koneksi duplikat

    const newSocket = io(BASE_URL, {
      query: { userId: user.userId },
      withCredentials: true,
      reconnection: true, // ✅ Aktifkan auto-reconnect
    });

    newSocket.on("connect", () => {
      console.log("🔹 Socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
      console.log("📌 Online Users:", userIds);
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
