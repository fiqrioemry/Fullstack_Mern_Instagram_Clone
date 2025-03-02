import { Send, X } from "lucide-react";
import { chatControl, chatState } from "@/config";
import { useChatStore } from "@/store/useChatStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import AttachComponent from "../../form/AttachComponent";

const ChatInput = () => {
  const { sendChat } = useChatStore();

  const chatForm = useFormSchema(chatState, chatControl, sendChat);
  return (
    <div className="relative">
      {chatForm.values.image && (
        <div className="absolute bottom-14 p-2  w-40 h-40 overflow-hidden">
          <div className="absolute -top-5 -right-5">
            <X />
          </div>
          <img
            src={URL.createObjectURL(chatForm.values.image)}
            className="w-full h-full object-cover "
            onLoad={(e) => {
              if (e.target.src.startsWith("blob:")) {
                URL.revokeObjectURL(e.target.src);
              }
            }}
            alt="image"
          />
        </div>
      )}
      <form
        onSubmit={chatForm.handleSubmit}
        className="border-t border-muted md:p-4 p-2 flex items-center space-x-4"
      >
        <input
          type="text"
          name="message"
          value={chatForm.values.message}
          onChange={chatForm.handleChange}
          className="flex-1 p-2 border border-muted bg-background rounded-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <AttachComponent form={chatForm} name="image" />
        <button
          type="submit"
          disabled={!chatForm.dirty}
          className="p-1 btn-accent disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
