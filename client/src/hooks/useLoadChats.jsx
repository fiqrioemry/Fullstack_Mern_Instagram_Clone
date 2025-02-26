import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const useLoadChats = () => {
  const { chats, setSelectedUser, getChats, loading } = useChatStore();

  useEffect(() => {
    getChats();
  }, [getChats]);

  return { setSelectedUser, chats, getChats, loading };
};

export default useLoadChats;
