import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import callApi from "../api/callApi";

export const useChatStore = create((set, get) => ({
  chat: [],
  chats: [],
  loading: {},
  selectedUser: null,

  getChats: async () => {
    set((state) => ({ loading: { ...state.loading, getChats: true } }));

    try {
      const chats = await callApi.getChats();
      set({ chats });
    } catch (error) {
      console.error(error.message);
    } finally {
      set((state) => ({ loading: { ...state.loading, getChats: false } }));
    }
  },
  getChat: async () => {
    const userId = get().selectedUser.userId;
    set((state) => ({ loading: { ...state.loading, getChat: true } }));

    try {
      const { message, chat } = await callApi.getChat(userId);
      toast.success(message);
      set({ chat });
    } catch (error) {
      set({ chat: [] });
      console.error(error.message);
    } finally {
      set((state) => ({ loading: { ...state.loading, getChat: false } }));
    }
  },

  sendChat: async (formData) => {
    const receiverId = get().selectedUser.userId;
    set({ loading: { ...get().loading, sendChat: true } });

    try {
      const { message, newChat } = await callApi.sendChat(formData, receiverId);
      set({ chat: [...get().chat, newChat] });
      toast.success(message);
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: { ...get().loading, sendChat: false } });
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
