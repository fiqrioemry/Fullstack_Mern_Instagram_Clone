import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import callApi from "../api/callApi";

export const useMessageStore = create((set, get) => ({
  message: [],
  messages: [],
  selectedUser: null,
  loading: false,

  getAllMessages: async () => {
    set({ loading: true });
    try {
      const chatList = await callApi.getAllMessages();
      set({ chatList });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getMessage: async (userId) => {
    set({ loading: true });
    try {
      const messages = await callApi.getMessage(userId);
      console.log(messages);
      set({ messages });
    } catch (error) {
      set({ messages: [] });
      console.log(error.message);
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (formData, receiverId) => {
    set({ loading: true });
    try {
      const { message, newChat } = await callApi.sendMessage(
        formData,
        receiverId
      );
      toast.success(message);
      set({ messages: [...get.state.messages, newChat] });
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

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;
      set({
        message: [...get().message, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
