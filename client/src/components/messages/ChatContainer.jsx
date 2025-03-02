import useLoadChat from "@/hooks/useLoadChat";
import SelectedChat from "./chat-container/SelectedChat";
import NoSelectedChat from "./chat-container/NoSelectedChat";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

// eslint-disable-next-line react/prop-types
const ChatContainer = ({ setOpen }) => {
  const { chat, selectedUser } = useLoadChat();

  if (!selectedUser) return <NoSelectedChat setOpen={setOpen} />;

  if (!chat) return <ChatContainerLoading />;

  return <SelectedChat chat={chat} selectedUser={selectedUser} />;
};

export default ChatContainer;
