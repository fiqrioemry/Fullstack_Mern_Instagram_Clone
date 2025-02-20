import Avatar from "@/components/ui/Avatar";
import { useEffect, useState } from "react";
import StartNewMessage from "./StartNewMessage";
import { MessageSquareDiff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useMessageStore } from "@/store/useMessageStore";
import MessageSidebarLoading from "@/components/skeleton/MessageSidebarLoading";

const MessageSidebar = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const { getAllMessages, loading } = useMessageStore();

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  if (loading) return <MessageSidebarLoading />;

  return (
    <aside className="h-full border-r border-muted-foreground/20">
      <div className="border-b border-muted-foreground/20">
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2">
            <Avatar avatar={user.avatar} />
            <span className="text-sm">{user.username}</span>
          </div>
          <button onClick={() => setOpen(true)} className="btn-secondary">
            <MessageSquareDiff />
          </button>
        </div>
      </div>
      <StartNewMessage open={open} setOpen={setOpen} />
    </aside>
  );
};
export default MessageSidebar;
