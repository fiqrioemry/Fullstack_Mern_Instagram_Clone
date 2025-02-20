/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Image, Send } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/useChatStore";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

const ChatContainer = ({ handleClick }) => {
  const { selectedUser, getChat, chat, loading } = useChatStore();

  useEffect(() => {
    if (selectedUser) {
      getChat(selectedUser.userId);
    }
  }, [getChat, selectedUser]);

  return (
    <>
      {!selectedUser && !chat ? (
        <NoSelectedChat handleClick={handleClick} />
      ) : loading ? (
        <ChatContainerLoading />
      ) : (
        <SelectedChat user={selectedUser} />
      )}
    </>
  );
};

const SelectedChat = ({ user }) => {
  return (
    <>
      {/* Header */}
      <div className="border-b border-muted p-4 flex items-center space-x-4">
        <Avatar avatar={user.avatar} />
        <span className="font-medium">{user?.username || "User"}</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 "></div>

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

const NoSelectedChat = ({ handleClick }) => {
  return (
    <div className="h-full flex-center">
      <Button onClick={handleClick} variant="accent">
        Start message
      </Button>
    </div>
  );
};

export default ChatContainer;
