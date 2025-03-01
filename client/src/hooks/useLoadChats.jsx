import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const useLoadChats = () => {
  const { chats, sendChat, setSelectedUser, getChats } = useChatStore();

  useEffect(() => {
    getChats();
  }, [getChats, sendChat]);

  return { setSelectedUser, chats, getChats };
};

export default useLoadChats;
