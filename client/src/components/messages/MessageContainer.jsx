import { useEffect } from "react";
import { Image, Send } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { useMessageStore } from "@/store/useMessageStore";
import ChatContainerLoading from "../skeleton/ChatContainerLoading";

const MessageContainer = ({ handleClick }) => {
  const { selectedUser, getMessage, message, loading } = useMessageStore();

  useEffect(() => {
    if (selectedUser) {
      getMessage(selectedUser);
    }
  }, [selectedUser]);

  return (
    <div className="flex flex-col h-full">
      {!selectedUser && (!Array.isArray(message) || message.length === 0) ? (
        <NoSelectedMessage handleClick={handleClick} />
      ) : loading ? (
        <ChatContainerLoading />
      ) : (
        <SelectedMessage user={selectedUser} />
      )}
    </div>
  );
};

const SelectedMessage = ({ user }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-muted p-4 flex items-center space-x-4">
        <Avatar user={user.avatar} />
        <span className="font-medium">{user?.username || "User"}</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background"></div>

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
    </div>
  );
};

const NoSelectedMessage = ({ handleClick }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col gap-4 text-center">
        <span className="text-muted-foreground">Find a user to</span>
        <Button onClick={handleClick} variant="accent">
          Start message
        </Button>
      </div>
    </div>
  );
};

export default MessageContainer;
