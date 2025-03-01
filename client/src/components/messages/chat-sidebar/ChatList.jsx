import UserDisplay from "./UserDisplay";
import useLoadChats from "@/hooks/useLoadChats";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatListLoading from "@/components/skeleton/ChatListLoading";

const ChatList = () => {
  const { chats, setSelectedUser } = useLoadChats();

  if (!chats) return <ChatListLoading />;

  if (chats.length === 0) return null;

  return (
    <ScrollArea className="flex-1 overflow-y-auto ">
      {chats.map((chat) => (
        <button
          key={chat.userId}
          onClick={() => setSelectedUser(chat)}
          className="hover:bg-secondary duration-300 w-full flex items-center justify-center md:justify-start p-4"
        >
          <UserDisplay user={chat} />
        </button>
      ))}
    </ScrollArea>
  );
};

export default ChatList;
