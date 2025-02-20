import { useState } from "react";
import ChatSidebar from "@/components/messages/ChatSidebar";
import ChatContainer from "@/components/messages/ChatContainer";
import SearchUserForChat from "@/components/messages/SearchUserForChat";

export default function Messages() {
  const [open, setOpen] = useState(false);

  const handleSearchUser = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="flex h-screen">
      <SearchUserForChat open={open} setOpen={setOpen} />
      <div className="w-1/4">
        <div className="h-full border-r border-muted">
          <ChatSidebar handleClick={handleSearchUser} />
        </div>
      </div>
      <div className="w-3/4">
        <div className="flex flex-col h-full">
          <ChatContainer handleClick={handleSearchUser} />
        </div>
      </div>
    </div>
  );
}
