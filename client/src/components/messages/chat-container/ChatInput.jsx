/* eslint-disable react-hooks/exhaustive-deps */
import { Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { chatControl, chatState } from "@/config";
import { useChatStore } from "@/store/useChatStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import AttachComponent from "@/components/form/AttachComponent";

const ChatInput = () => {
  const { sendChat, selectedUser } = useChatStore();
  const [imagePreview, setImagePreview] = useState(null);
  const chatForm = useFormSchema(chatState, chatControl, sendChat);

  useEffect(() => {
    if (chatForm.values.image) {
      const imageUrl = URL.createObjectURL(chatForm.values.image);
      setImagePreview(imageUrl);

      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    } else {
      setImagePreview(null);
    }
  }, [chatForm.values.image]);

  useEffect(() => {
    chatForm.resetForm();
  }, [selectedUser]);

  return (
    <div className="relative">
      {/* Preview Gambar */}
      {imagePreview && (
        <div className="absolute left-2 bottom-20">
          <button
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
            onClick={() => chatForm.setFieldValue("image", null)}
            type="button"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="w-40 h-40 overflow-hidden animate-fadeIn">
            <img
              src={imagePreview}
              className="w-full h-full object-cover rounded-lg"
              alt="preview"
            />
          </div>
        </div>
      )}

      {/* Form Input */}
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
          disabled={!chatForm.values.message.trim() && !chatForm.values.image}
          className="p-1 btn-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
