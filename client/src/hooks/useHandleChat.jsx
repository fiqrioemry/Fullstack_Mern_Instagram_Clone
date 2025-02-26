import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const useHandleChat = () => {
  const {
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
};

export default useHandleChat;
