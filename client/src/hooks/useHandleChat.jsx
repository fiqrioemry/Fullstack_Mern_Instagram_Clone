import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

const useHandleChat = () => {
  const {
    getChat,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();



export default useHandleChat;
