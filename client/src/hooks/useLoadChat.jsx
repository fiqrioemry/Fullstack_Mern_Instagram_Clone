import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const useLoadChat = () => {
  const {
    chat,
    loading,
    getChat,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  useEffect(() => {
    if (selectedUser) {
      getChat(selectedUser.userId);
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [getChat, selectedUser, subscribeToMessages, unsubscribeFromMessages]);

  return { chat, loading, selectedUser };
};

export default useLoadChat;
