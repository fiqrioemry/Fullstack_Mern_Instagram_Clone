import ChatInput from "./ChatInput";
import ChatDisplay from "./ChatDisplay";
import ChatPartner from "./ChatPartner";
import useLoadChat from "@/hooks/useLoadChat";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

const SelectedChat = () => {
  const { chat, loading, selectedUser } = useLoadChat();

  if (loading.getChat) return <ChatContainerLoading />;

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b border-muted">
        <ChatPartner user={selectedUser} />
      </div>

      {/* Chat display */}
      <ChatDisplay chat={chat} selectedUser={selectedUser} />

      {/* Chat input */}
      <ChatInput />
    </div>
  );
};

export default SelectedChat;
