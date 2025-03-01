import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const useLoadChat = () => {
  const {
    chat,
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

  return { chat, selectedUser };
};

export default useLoadChat;
