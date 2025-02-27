import UserDisplay from "./UserDisplay";
import useLoadChats from "@/hooks/useLoadChats";
import ChatListLoading from "@/components/skeleton/ChatListLoading";

const ChatList = () => {
  const { loading, chats, setSelectedUser } = useLoadChats();

  if (loading.getChats) return <ChatListLoading />;

  if (chats.length === 0) return null;

  return (
    <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
      {chats.map((chat) => (
        <button
          key={chat.userId}
          onClick={() => setSelectedUser(chat)}
          className="hover:bg-secondary duration-300 w-full py-2 px-4"
        >
          <UserDisplay user={chat} />
        </button>
      ))}
    </div>
  );
};

export default ChatList;
