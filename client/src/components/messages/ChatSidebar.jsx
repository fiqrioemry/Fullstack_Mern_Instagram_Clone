import { MessageSquareDiff } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import UserDisplay from "./chat-sidebar/UserDisplay";
import ChatList from "@/components/messages/chat-sidebar/ChatList";

const ChatSidebar = () => {
  const { user } = useAuthStore();
  const { handleOpen } = useChatStore();

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-muted md:flex-between flex-center py-4 px-4">
        <div className="hidden md:block px-2">
          <UserDisplay user={user} />
        </div>

        <button onClick={handleOpen} className="btn-secondary">
          <MessageSquareDiff size={36} />
        </button>
      </div>

      <ChatList />
    </div>
  );
};

export default ChatSidebar;
