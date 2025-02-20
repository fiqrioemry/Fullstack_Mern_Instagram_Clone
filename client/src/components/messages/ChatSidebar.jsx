import { useEffect } from "react";
import ChatList from "./ChatList";
import Avatar from "@/components/ui/Avatar";
import { MessageSquareDiff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import ChatSidebarLoading from "@/components/skeleton/ChatSidebarLoading";

// eslint-disable-next-line react/prop-types
const ChatSidebar = ({ handleClick }) => {
  const { user } = useAuthStore();
  const { getChats, chats, loading } = useChatStore();

  useEffect(() => {
    getChats();
  }, [getChats]);

  if (!loading) return <ChatSidebarLoading />;

  return (
    <>
      <div className="border-b border-muted">
        <div className="flex-between px-2 py-4">
          <div className="flex items-center gap-2">
            <Avatar avatar={user.avatar} />
            <span className="text-sm">{user.username}</span>
          </div>
          <button onClick={handleClick} className="btn-secondary">
            <MessageSquareDiff />
          </button>
        </div>
      </div>
      <div className="flex-1 px-2 py-4 overflow-y-auto space-y-4 ">
        {chats.length > 0 && <ChatList />}
      </div>
    </>
  );
};
export default ChatSidebar;
