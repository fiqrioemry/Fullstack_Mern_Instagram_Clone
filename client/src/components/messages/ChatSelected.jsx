import { useEffect, useRef } from "react";
import { Image, Send } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { chatControl, chatState } from "@/config";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormSchema } from "@/hooks/useFormSchema";

const ChatSelected = () => {
  const { user } = useAuthStore();
  const chatEndRef = useRef(null);
  const { selectedUser, loading, chat, sendChat } = useChatStore();
  const chatForm = useFormSchema(chatState, chatControl, sendChat);

  const handleSendMessage = () => {
    chatForm.handleSubmit();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-muted p-4 flex items-center space-x-4">
        <Avatar avatar={selectedUser?.avatar} />
        <span className="font-medium">{selectedUser?.username || "User"}</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {chat.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No Chat History
          </div>
        ) : (
          <div className="space-y-2">
            {chat.map((message) => {
              const isSender = message.sender_id === user.userId;

              return (
                <div
                  key={message.timestamp}
                  className={`flex items-end space-x-2 ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isSender && (
                    <Avatar avatar={selectedUser?.avatar} className="w-8 h-8" />
                  )}

                  <div
                    className={`p-3 rounded-lg shadow-md max-w-xs ${
                      isSender ? "bg-blue-500 text-foreground" : "bg-secondary"
                    }`}
                  >
                    <div className="text-sm">{message.message}</div>
                    <span className="text-xs text-foreground block mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {loading.sendChat && (
          <div className="flex items-end space-x-2 justify-end">
            <Skeleton className="h-12 rounded-lg shadow-md max-w-xs " />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="border-t border-muted p-4 flex items-center space-x-4">
        <input
          type="text"
          name="message"
          value={chatForm.values.message}
          onChange={chatForm.handleChange}
          className="flex-1 p-2 border border-muted bg-background rounded-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button className="p-1 btn-accent">
          <Image className="h-5 w-5" />
        </button>
        <button
          onClick={handleSendMessage}
          disabled={!(chatForm.isValid && chatForm.dirty)}
          className="p-1 btn-accent disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatSelected;
