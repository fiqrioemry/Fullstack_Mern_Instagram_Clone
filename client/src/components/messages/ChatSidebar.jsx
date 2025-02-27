/* eslint-disable react/prop-types */
import ChatList from "./ChatList";
import Avatar from "@/components/ui/Avatar";
import { MessageSquareDiff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const ChatSidebar = ({ setOpen }) => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="border-b border-muted">
        <div className="h-20 flex-between px-4">
          <div className="md:flex items-center gap-2 hidden">
            <Avatar avatar={user.avatar} />
            <span className="text-sm">{user.username}</span>
          </div>
          <button onClick={() => setOpen(true)} className="btn-secondary">
            <MessageSquareDiff />
          </button>
        </div>
      </div>
      <ChatList />
    </div>
  );
};

export default ChatSidebar;
