import UserDisplay from "./UserDisplay";
import { MessageSquare } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const SidebarHeader = () => {
  const { user } = useAuthStore();
  const { handleOpen } = useChatStore;

  return (
    <div className="border-b border-muted md:flex-between flex-center py-4 px-4">
      <div className="hidden md:block px-2">
        <UserDisplay user={user} />
      </div>

      <button onClick={handleOpen} className="btn-secondary text-xs md:text-md">
        <MessageSquare size={36} />
      </button>
    </div>
  );
};

export default SidebarHeader;
