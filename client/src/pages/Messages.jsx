import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import Avatar from "../components/ui/Avatar";

const messages = [
  {
    id: 1,
    sender: "me",
    text: "Kwkwk...pas lah kuliat ada jg nama bayu + bg rehan, tapi kau kok ga ada pulak wak",
    time: "7:19 AM",
  },
  { id: 2, sender: "other", text: "rio", time: "7:50 AM" },
  { id: 3, sender: "other", text: "ada", time: "7:50 AM" },
  { id: 4, sender: "other", text: "aldo adaa", time: "7:50 AM" },
  { id: 5, sender: "other", text: "hahaha", time: "7:50 AM" },
  { id: 6, sender: "other", text: "zakii ada", time: "7:50 AM" },
  {
    id: 7,
    sender: "other",
    text: "Message unavailable",
    time: "2:34 PM",
    unavailable: true,
  },
];

export default function Messages() {
  const [input, setInput] = useState("");
  const { user } = useAuthStore();
  const sendMessage = () => {
    if (!input.trim()) return;
    messages.push({
      id: messages.length + 1,
      sender: "me",
      text: input,
      time: "Now",
    });
    setInput("");
  };

  return (
    <div className="flex h-screen bg-background mt-12 md:mt-0">
      <div className="w-1/4 bg-background border-r border-muted-foreground p-2">
        <div className=""></div>
        <div></div>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 flex flex-col">
        <div className="bg-background p-2 border-b border-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar avatar={user.avatar} />
            <span>ahmadfiqri</span>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-2 overflow-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.sender === "me" ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                {msg.unavailable ? (
                  <span className="italic text-gray-400">{msg.text}</span>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-2 flex bg-background border-t border-muted-foreground/30">
          <Input
            type="text"
            placeholder="Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} className="p-2">
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
