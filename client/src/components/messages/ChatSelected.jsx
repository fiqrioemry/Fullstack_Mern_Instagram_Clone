import { Image, Send } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { useChatStore } from "@/store/useChatStore";

const ChatSelected = () => {
  const { selectedUser, chat, loading } = useChatStore();
  return (
    <>
      {/* Header */}
      <div className="border-b border-muted p-4 flex items-center space-x-4">
        <Avatar avatar={selectedUser.avatar} />
        <span className="font-medium">{selectedUser?.username || "User"}</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 ">
        {chat.length === 0 ? <div>No Chat History</div> : <div>{chat}</div>}
      </div>

      {/* Input Box */}
      <div className="border-t border-muted p-4 flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 p-2 border border-muted bg-background rounded-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button className="p-2 rounded-lg hover:bg-muted">
          <Image className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};

export default ChatSelected;
