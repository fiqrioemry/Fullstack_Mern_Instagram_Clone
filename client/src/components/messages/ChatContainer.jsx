/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/useChatStore";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";
import ChatSelected from "./ChatSelected";

const ChatContainer = ({ handleClick }) => {
  const {
    selectedUser,
    getChat,
    chat,
    loading,
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

  if (loading.getChat) return <ChatContainerLoading />;

  return (
    <>
      {!selectedUser || !chat ? (
        <NoSelectedChat handleClick={handleClick} />
      ) : (
        <ChatSelected />
      )}
    </>
  );
};

const NoSelectedChat = ({ handleClick }) => {
  return (
    <div className="h-full flex-center">
      <Button onClick={handleClick} variant="accent">
        Start message
      </Button>
    </div>
  );
};

export default ChatContainer;
