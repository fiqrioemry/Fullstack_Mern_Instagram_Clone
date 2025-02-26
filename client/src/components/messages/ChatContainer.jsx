import SelectedChat from "./SelectedChat";
import NoSelectedChat from "./NoSelectedChat";
import useHandleChat from "@/hooks/useHandleChat";
import { useChatStore } from "@/store/useChatStore";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

// eslint-disable-next-line react/prop-types
const ChatContainer = ({ setOpen }) => {
  const { loading, selectedUser } = useChatStore();

  useHandleChat();

  if (loading.getChat) return <ChatContainerLoading />;

  return (
    <>
      {!selectedUser ? <NoSelectedChat setOpen={setOpen} /> : <SelectedChat />}
    </>
  );
};

export default ChatContainer;
