/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Send } from "lucide-react";
import AttachImage from "./ChatAttachForm";

const ChatInput = ({ form, selectedUser }) => {
  useEffect(() => {
    form.resetForm();
  }, [selectedUser]);

  return (
    <>
      <form
        onSubmit={form.handleSubmit}
        className="border-t border-muted md:p-4 p-2 flex items-center space-x-4"
      >
        <input
          type="text"
          name="message"
          value={form.values.message}
          onChange={form.handleChange}
          className="flex-1 p-2 border border-muted bg-background rounded-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <AttachImage form={form} />
        <button
          type="submit"
          disabled={!form.values.message.trim() && !form.values.image}
          className="p-1 btn-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </>
  );
};

export default ChatInput;
