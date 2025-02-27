/* eslint-disable react/prop-types */
import Avatar from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/useAuthStore";

const ChatPartner = ({ user }) => {
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex items-center px-4 h-20">
      <Avatar avatar={user.avatar} />

      <div className="hidden md:flex flex-col items-start text-sm">
        <div>{user.username}</div>
        <div>
          {onlineUsers.includes(String(user.userId)) ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
};

export default ChatPartner;
