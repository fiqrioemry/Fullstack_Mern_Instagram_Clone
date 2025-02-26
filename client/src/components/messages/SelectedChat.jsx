import ChatInput from "./ChatInput";
import ChatDisplay from "./ChatDisplay";
import Avatar from "@/components/ui/Avatar";
import useLoadChat from "@/hooks/useLoadChat";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

const SelectedChat = () => {
  const { chat, loading, selectedUser } = useLoadChat();

  if (loading.getChat) return <ChatContainerLoading />;

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b border-muted p-4 flex items-center space-x-4">
        <Avatar avatar={selectedUser?.avatar} />
        <span className="font-medium">{selectedUser?.username}</span>
      </div>

      {/* Chat displau */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <ChatDisplay chat={chat} selectedUser={selectedUser} />
      </div>

      {/* Chat input */}
      <ChatInput />
    </div>
  );
};

export default SelectedChat;
