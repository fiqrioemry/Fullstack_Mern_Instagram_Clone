import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import callApi from "../api/callApi";

export const useChatStore = create((set, get) => ({
  chat: null,
  chats: [],
  loading: false,
  selectedUser: null,

  getChats: async () => {
    set({ loading: true });
    try {
      const chats = await callApi.getChats();
      set({ chats });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getChat: async (userId) => {
    set({ loading: true });
    try {
      const chat = await callApi.getChat(userId);
      set({ chat });
    } catch (error) {
      set({ chat: [] });
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  sendChat: async (formData, receiverId) => {
    set({ loading: true });
    try {
      const { message, newChat } = await callApi.sendChat(formData, receiverId);
      toast.success(message);
      set({ chat: [...get.state.chat, newChat] });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newChat", (newChat) => {
      const isSentFromSelectedUser = newChat.senderId === selectedUser.userId;
      if (!isSentFromSelectedUser) return;
      set({
        chat: [...get().chat, newChat],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newChat");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
