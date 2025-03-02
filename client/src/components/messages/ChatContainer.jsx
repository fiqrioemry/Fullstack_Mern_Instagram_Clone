import useLoadChat from "@/hooks/useLoadChat";
import { chatControl, chatState } from "@/config";
import { useFormSchema } from "@/hooks/useFormSchema";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatAttachPreview from "./chat-container/ChatAttachPreview";
import ChatInput from "@/components/messages/chat-container/ChatInput";
import UserDisplay from "@/components/messages/chat-sidebar/UserDisplay";
import ChatDisplay from "@/components/messages/chat-container/ChatDisplay";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

const ChatContainer = () => {
  const { chat, sendChat, loading, selectedUser } = useLoadChat();

  const chatForm = useFormSchema(chatState, chatControl, sendChat);

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
        {!loading && <ChatAttachPreview form={chatForm} />}
        <ChatInput form={chatForm} selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default ChatContainer;
