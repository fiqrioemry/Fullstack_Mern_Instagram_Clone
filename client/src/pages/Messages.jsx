import { useState } from "react";
import ChatSidebar from "@/components/messages/ChatSidebar";
import ChatContainer from "@/components/messages/ChatContainer";
import SearchUserForChat from "@/components/messages/SearchUserForChat";

export default function Messages() {
  const [open, setOpen] = useState();

  return (
    <>
      <SearchUserForChat open={open} setOpen={setOpen} />

      <div className="w-1/6 md:w-1/4 h-full border-r border-muted ">
        <ChatSidebar setOpen={setOpen} />
      </div>

      <div className="w-5/6 md:w-3/4 h-full flex flex-col ">
        <ChatContainer setOpen={setOpen} />
      </div>
    </>
  );
}
