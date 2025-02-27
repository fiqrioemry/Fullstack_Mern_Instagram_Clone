import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const useLoadChats = () => {
  const { chats, sendChat, setSelectedUser, getChats, loading } =
    useChatStore();

  useEffect(() => {
    getChats();
  }, [getChats, sendChat]);

  return { setSelectedUser, chats, getChats, loading };
};

export default useLoadChats;
