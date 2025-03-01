import useLoadChat from "@/hooks/useLoadChat";
import ChatInput from "@/components/messages/chat-container/ChatInput";
import UserDisplay from "@/components/messages/chat-sidebar/UserDisplay";
import ChatDisplay from "@/components/messages/chat-container/ChatDisplay";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

const SelectedChat = () => {
  const { chat, selectedUser } = useLoadChat();

  if (!chat) return <ChatContainerLoading />;

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
