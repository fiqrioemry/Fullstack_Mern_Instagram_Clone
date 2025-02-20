import { useEffect } from "react";
import MessageList from "./MessageList";
import Avatar from "@/components/ui/Avatar";
import { MessageSquareDiff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useMessageStore } from "@/store/useMessageStore";
import MessageSidebarLoading from "@/components/skeleton/MessageSidebarLoading";

// eslint-disable-next-line react/prop-types
const MessageSidebar = ({ handleClick }) => {
  const { user } = useAuthStore();
  const { getAllMessages, messages, loading } = useMessageStore();

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  if (loading) return <MessageSidebarLoading />;

  return (
    <aside className="h-full border-r border-muted">
      <div className="border-b border-muted">
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2">
            <Avatar avatar={user.avatar} />
            <span className="text-sm">{user.username}</span>
          </div>
          <button onClick={handleClick} className="btn-secondary">
            <MessageSquareDiff />
          </button>
        </div>
      </div>
      {messages.length > 0 && <MessageList />}
    </aside>
  );
};
export default MessageSidebar;
