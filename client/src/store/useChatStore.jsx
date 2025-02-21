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
    const { chat } = get();
    set({ loading: true });
    try {
      const { message, newChat } = await callApi.sendChat(formData, receiverId);
      toast.success(message);
      set({ chat: [...chat, newChat] });
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newChat) => {
      const isMessageSentFromSelectedUser =
        newChat.receiverId === selectedUser.userId;
      if (!isMessageSentFromSelectedUser) return;

      set({
        chat: [...get().chat, newChat],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser, chat: [] });
  },
}));
