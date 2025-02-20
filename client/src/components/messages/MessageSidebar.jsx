import { useEffect } from "react";
import Avatar from "@/components/ui/Avatar";
import { useMessageStore } from "@/store/useMessageStore";
import { useAuthStore } from "@/store/useAuthStore";
import MessageSidebarLoading from "@/components/skeleton/MessageSidebarLoading";
import { MessageSquareDiff } from "lucide-react";

const MessageSidebar = () => {
  const { user } = useAuthStore();
  const { getAllMessages, messages, setSelectedUser, loading } =
    useMessageStore();

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  const handleSelectedMessage = (userId) => {
    setSelectedUser(userId);
  };

  if (loading) return <MessageSidebarLoading />;

  return (
    <aside className="h-full border-r border-muted-foreground/20">
      <div className="border-b border-muted-foreground/20">
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2">
            <Avatar avatar={user.avatar} />
            <span className="text-sm">{user.username}</span>
          </div>
          <button className="btn-secondary">
            <MessageSquareDiff />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {[...Array(5)].map((_, index) => (
          <button
            onClick={() => handleSelectedMessage()}
            className="hover:bg-secondary duration-300 w-full py-2 px-4"
            key={index}
          >
            <div className="flex items-center gap-4">
              <Avatar avatar={null} />
              <div className="flex flex-col items-start text-sm">
                <div>ahmadfiqri</div>
                <div>online</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
export default MessageSidebar;
// {messages.map((message) => (
//   <button className="px-4" key={message.chat_id}>
//     <div className="flex items-center gap-4">
//       <Avatar avatar={message.avatar} />
//       <div className="space-y-2">
//         <span>{message.username}</span>
//         <span>{message.status}</span>
//       </div>
//     </div>
//   </button>
// ))}
