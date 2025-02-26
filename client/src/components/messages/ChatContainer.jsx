import SelectedChat from "./SelectedChat";
import NoSelectedChat from "./NoSelectedChat";
import { useChatStore } from "@/store/useChatStore";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const ChatContainer = ({ setOpen }) => {
  const {
    loading,
    chat,
    sendChat,
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

  if (loading.getChat) return <ChatContainerLoading />;

  return (
    <>
      {!selectedUser ? (
        <NoSelectedChat setOpen={setOpen} />
      ) : (
        <SelectedChat
          chat={chat}
          sendChat={sendChat}
          selectedUser={selectedUser}
        />
      )}
    </>
  );
};

export default ChatContainer;
