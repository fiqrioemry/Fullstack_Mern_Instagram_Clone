/* eslint-disable react/prop-types */
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";

const ChatDisplay = ({ chat, selectedUser }) => {
  const { user } = useAuthStore();

  if (chat.length === 0) return <div className="mt-10">No Chat History</div>;

  return (
    <>
      <div className="space-y-2 py-4">
        {chat.map((message) => {
          const isSender = message.senderId == user.userId;

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
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="w-48 rounded-md mb-2"
                  />
                )}
                <div className="text-start text-sm">{message.message}</div>
                <span className="text-end text-xs text-foreground block mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChatDisplay;
