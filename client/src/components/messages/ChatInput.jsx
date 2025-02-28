import { Image, Send } from "lucide-react";
import { chatControl, chatState } from "@/config";
import { useChatStore } from "@/store/useChatStore";
import { useFormSchema } from "@/hooks/useFormSchema";

const ChatInput = () => {
  const { sendChat } = useChatStore();

  const chatForm = useFormSchema(chatState, chatControl, sendChat);

  const handleSendMessage = () => {
    chatForm.handleSubmit();
  };

  return (
    <div className="border-t border-muted md:p-4 p-2 flex items-center space-x-4">
      <input
        type="text"
        name="message"
        value={chatForm.values.message}
        onChange={chatForm.handleChange}
        className="flex-1 p-2 border border-muted bg-background rounded-lg focus:outline-none"
        placeholder="Type a message..."
      />
      <button className="p-1 btn-accent">
        <Image className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={handleSendMessage}
        disabled={!(chatForm.isValid && chatForm.dirty)}
        className="p-1 btn-accent disabled:cursor-not-allowed"
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ChatInput;
