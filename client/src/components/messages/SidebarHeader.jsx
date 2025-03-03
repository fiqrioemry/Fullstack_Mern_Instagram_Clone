import UserDisplay from "./UserDisplay";
import { MessageSquareMore } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const SidebarHeader = () => {
  const { user } = useAuthStore();
  const { handleOpen } = useChatStore();

  return (
    <div className="border-b border-muted md:flex-between flex-center py-4 px-4">
      <div className="hidden md:block px-2">
        <UserDisplay user={user} />
      </div>

      <button onClick={handleOpen} className="btn-secondary text-xs md:text-md">
        <MessageSquareMore className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
      </button>
    </div>
  );
};

export default SidebarHeader;
