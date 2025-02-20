/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/useChatStore";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";
import ChatSelected from "./ChatSelected";

const ChatContainer = ({ handleClick }) => {
  const { selectedUser, getChat, chat, loading } = useChatStore();

  useEffect(() => {
    if (selectedUser) {
      getChat(selectedUser.userId);
    }
  }, [getChat, selectedUser]);

  if (loading && !chat) return <ChatContainerLoading />;

  return (
    <>
      {!selectedUser ? (
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
