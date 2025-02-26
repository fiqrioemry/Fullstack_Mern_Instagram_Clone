import { useEffect } from "react";
import { Image, Send } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { chatControl, chatState } from "@/config";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import useScrollToView from "@/hooks/useScrollToView";
import { useChatStore } from "@/store/useChatStore";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

const SelectedChat = () => {
  const { user } = useAuthStore();
  const {
    loading,
    chat,
    sendChat,
    getChat,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const chatForm = useFormSchema(chatState, chatControl, sendChat);
  const { viewRef } = useScrollToView(selectedUser);

  const handleSendMessage = () => {
    chatForm.handleSubmit();
  };

  useEffect(() => {
    if (selectedUser) {
      getChat(selectedUser.userId);
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [getChat, selectedUser, subscribeToMessages, unsubscribeFromMessages]);

  if (loading.getChat) return <ChatContainerLoading />;

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
              const isSender = message.senderId === user.userId;

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

        <div ref={viewRef} />
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

export default SelectedChat;
