import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { useAuthStore } from "./useAuthStore";

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
      const { chat } = await callApi.getChat(userId);
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
      toast.success(message);
      set({ chat: [...get().chat, newChat] });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: { ...get().loading, sendChat: false } });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newChat", (newChat) => {
      const isMessageSentFromSelectedUser =
        newChat.senderId === selectedUser.userId;
      if (!isMessageSentFromSelectedUser) return;

      set({
        chat: [...get().chat, newChat],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newChat");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
