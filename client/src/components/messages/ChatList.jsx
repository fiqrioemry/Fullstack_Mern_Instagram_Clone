import Avatar from "@/components/ui/Avatar";
import { useChatStore } from "@/store/useChatStore";

const ChatList = () => {
  const { chats, setSelectedUser } = useChatStore();

  const handleSelectedMessage = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      {chats.map((chat) => (
        <button
          onClick={() => handleSelectedMessage(chat)}
          className="hover:bg-secondary duration-300 w-full py-2 px-4"
          key={chat.userId}
        >
          <div className="flex items-center gap-4">
            <Avatar avatar={null} />
            <div className="flex flex-col items-start text-sm">
              <div>{chat.username}</div>
              <div>online</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatList;
