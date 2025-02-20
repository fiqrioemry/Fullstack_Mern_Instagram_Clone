import { useEffect } from "react";
import { Image, Send } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { useMessageStore } from "@/store/useMessageStore";
import ChatContainerLoading from "../skeleton/ChatContainerLoading";

const MessageContainer = () => {
  const { selectedUser, getMessage, message, loading } = useMessageStore();

  useEffect(() => {
    if (selectedUser) {
      getMessage(selectedUser);
    }
  }, [getMessage, selectedUser]);

  return (
    <div className="flex flex-col h-full">
      {!selectedUser && message.length === 0 ? (
        <div className="flex-center h-full">
          <div className="flex flex-col gap-4 text-center">
            Find a user to
            <Button variant="accent">Start message</Button>
          </div>
        </div>
      ) : loading ? (
        <ChatContainerLoading />
      ) : (
        <div>
          <div className="border-b border-muted">
            <div className="flex items-center py-4 px-2 space-x-4">
              <Avatar />
              <span>Ahmadfiqri</span>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4"></div>
          <div className="border-t border-muted">
            <div className="flex items-center py-2 px-4 space-x-4">
              <input
                type="text"
                className="flex-1 p-2 border-muted bg-background rounded-lg focus:outline-none "
                placeholder="Type a message..."
              />

              <button className="btn-accent">
                <Image className="h-5 w-5" />
              </button>
              <button className="btn-accent">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
