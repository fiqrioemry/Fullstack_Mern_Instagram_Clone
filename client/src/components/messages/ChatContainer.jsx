import SelectedChat from "./SelectedChat";
import NoSelectedChat from "./NoSelectedChat";
import { useChatStore } from "@/store/useChatStore";

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
