/* eslint-disable react/prop-types */
import Avatar from "@/components/ui/Avatar";

const ChatList = ({ chats, setSelectedUser }) => {
  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      {chats.map((chat) => (
        <button
          onClick={() => setSelectedUser(chat)}
          className="hover:bg-secondary duration-300 w-full py-2 px-4"
          key={chat.userId}
        >
          <div className="flex items-center gap-4">
            <Avatar avatar={chat.avatar} />
            <div className="flex flex-col items-start text-sm">
              <div>{chat.username}</div>
              <div>{chat.status}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatList;
