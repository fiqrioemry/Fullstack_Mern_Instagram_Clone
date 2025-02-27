/* eslint-disable react/prop-types */
import ChatList from "./ChatList";
import UserDisplay from "./UserDisplay";
import { MessageSquareDiff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const ChatSidebar = ({ setOpen }) => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="border-b border-muted md:flex-between flex-center py-4 px-2">
        <div className="hidden md:block">
          <UserDisplay user={user} />
        </div>

        <button onClick={() => setOpen(true)} className="btn-secondary">
          <MessageSquareDiff size={36} />
        </button>
      </div>
      <ChatList />
    </div>
  );
};

export default ChatSidebar;
