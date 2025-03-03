import UserDisplay from "./UserDisplay";
import useLoadChats from "@/hooks/useLoadChats";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatListLoading from "@/components/skeleton/ChatListLoading";

const SidebarChatLists = () => {
  const { chats, setSelectedUser } = useLoadChats();

  if (!chats) return <ChatListLoading />;

  if (chats.length === 0) return null;

  return (
    <ScrollArea className="flex-1 overflow-y-auto px-2">
      {chats.map((chat) => (
        <button
          key={chat.userId}
          onClick={() => setSelectedUser(chat)}
          className="duration-300 w-full flex items-center btn-nav mt-2 justify-center md:justify-start p-2"
        >
          <UserDisplay user={chat} />
        </button>
      ))}
    </ScrollArea>
  );
};

export default SidebarChatLists;
