import MessageSidebar from "@/components/messages/MessageSidebar";
import MessageContainer from "@/components/messages/MessageContainer";
import { useState } from "react";

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState();

  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <MessageSidebar selectedUser={selectedUser} />
      </div>
      <div className="w-3/4">
        <MessageContainer />
      </div>
    </div>
  );
}
