import { useChatStore } from "@/store/useChatStore";
import SelectedChat from "./chat-container/SelectedChat";
import NoSelectedChat from "./chat-container/NoSelectedChat";

// eslint-disable-next-line react/prop-types
const ChatContainer = ({ setOpen }) => {
  const { selectedUser } = useChatStore();

  return (
    <>
      {!selectedUser ? <NoSelectedChat setOpen={setOpen} /> : <SelectedChat />}
    </>
  );
};

export default ChatContainer;
