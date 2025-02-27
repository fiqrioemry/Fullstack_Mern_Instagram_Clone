import ChatInput from "./ChatInput";
import UserDisplay from "./UserDisplay";
import ChatDisplay from "./ChatDisplay";
import useLoadChat from "@/hooks/useLoadChat";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

const SelectedChat = () => {
  const { chat, loading, selectedUser } = useLoadChat();

  if (loading.getChat) return <ChatContainerLoading />;

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center border-b border-muted py-4 gap-4 px-2">
        <UserDisplay user={selectedUser} />
        <div className="block md:hidden">{selectedUser.username}</div>
      </div>

      {/* Chat display */}
      <ChatDisplay chat={chat} selectedUser={selectedUser} />

      {/* Chat input */}
      <ChatInput />
    </div>
  );
};

export default SelectedChat;
