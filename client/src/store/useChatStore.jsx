import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import callApi from "../api/callApi";

export const useChatStore = create((set, get) => ({
  chat: [],
  chats: [],
  loading: false,
  selectedUser: null,

  getChats: async () => {
    set({ loading: true });
    try {
      const chats = await callApi.getChats();
      set({ chats });
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getChat: async (userId) => {
    if (!userId) return;

    set({ loading: true });
    try {
      const { message, chat } = await callApi.getChat(userId);
      toast.success(message);
      set({ chat });
    } catch (error) {
      set({ chat: [] });
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  sendChat: async (formData, receiverId) => {
    if (!receiverId) return;

    set({ loading: true });
    try {
      const { message, newChat } = await callApi.sendChat(formData, receiverId);

      toast.success(message);

      set((state) => ({
        chat: [...state.chat, newChat],
      }));
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, chat } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.off("newChat");
    socket.on("newChat", (newChat) => {
      if (
        newChat.senderId === selectedUser.userId ||
        newChat.receiverId === selectedUser.userId
      ) {
        set({ chat: [...chat, newChat] });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newChat");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser, chat: [] });
  },
}));
