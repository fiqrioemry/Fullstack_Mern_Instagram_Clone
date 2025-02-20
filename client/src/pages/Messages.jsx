import { useState } from "react";
import MessageSidebar from "@/components/messages/MessageSidebar";
import SearchUserForChat from "@/components/messages/SearchUserForChat";
import MessageContainer from "@/components/messages/MessageContainer";

export default function Messages() {
  const [open, setOpen] = useState(false);

  const handleFindUser = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="flex h-screen">
      <SearchUserForChat open={open} setOpen={setOpen} />

      <div className="w-1/4">
        <MessageSidebar handleClick={handleFindUser} />
      </div>
      <div className="w-3/4">
        <MessageContainer handleClick={handleFindUser} />
      </div>
    </div>
  );
}
