import useLoadChat from "@/hooks/useLoadChat";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "@/components/messages/chat-container/ChatInput";
import UserDisplay from "@/components/messages/chat-sidebar/UserDisplay";
import ChatDisplay from "@/components/messages/chat-container/ChatDisplay";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

const ChatContainer = () => {
  const { chat, selectedUser } = useLoadChat();

  if (!chat) return <ChatContainerLoading />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center border-b border-muted py-4 gap-4 px-2">
        <UserDisplay user={selectedUser} />
        <div className="block md:hidden">{selectedUser.username}</div>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto px-2 text-center">
        <ChatDisplay chat={chat} selectedUser={selectedUser} />
      </ScrollArea>

      <div className="relative">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatContainer;
