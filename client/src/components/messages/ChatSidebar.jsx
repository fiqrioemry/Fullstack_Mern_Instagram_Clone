/* eslint-disable react/prop-types */
import ChatList from "./ChatList";
import Avatar from "@/components/ui/Avatar";
import { MessageSquareDiff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import ChatSidebarLoading from "@/components/skeleton/ChatSidebarLoading";
import { useChatStore } from "../../store/useChatStore";
import { useEffect } from "react";

const ChatSidebar = ({ setOpen }) => {
  const { user } = useAuthStore();
  const { chats, chat, setSelectedUser, getChats, loading } = useChatStore();

  useEffect(() => {
    getChats();
  }, [getChats, chat]);

  if (loading.getChats) return <ChatSidebarLoading />;

  return (
    <div>
      <div className="border-b border-muted">
        <div className="flex-between px-2 py-4">
          <div className="flex items-center gap-2">
            <Avatar avatar={user.avatar} />
            <span className="text-sm">{user.username}</span>
          </div>
          <button onClick={() => setOpen(true)} className="btn-secondary">
            <MessageSquareDiff />
          </button>
        </div>
      </div>
      <div className="flex-1 px-2 py-4 overflow-y-auto space-y-4 ">
        {chats.length > 0 && (
          <ChatList chats={chats} setSelectedUser={setSelectedUser} />
        )}
      </div>
    </div>
  );
};
export default ChatSidebar;
