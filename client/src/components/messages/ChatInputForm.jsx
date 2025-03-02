/* eslint-disable react/prop-types */
import { Send, X } from "lucide-react";
import Image from "@/components/ui/Image";
import { useFileUpload } from "@/hooks/useFileUpload";

const ChatInputForm = ({ form, loading }) => {
  const { singleFile } = useFileUpload(form.setFieldValue, form.values);

  return (
    <>
      {/* preview for image */}
      {!loading && form.values.image && (
        <div className="absolute left-2 bottom-20">
          <button
            className="absolute -top-2 -right-2 bg-white rounded-full p-1"
            onClick={() => form.setFieldValue("image", null)}
            type="button"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex items-center justify-center overflow-hidden w-40 h-40 rounded-md">
            <Image url={form.values.image} />
          </div>
        </div>
      )}

      {/* form input */}
      <form
        onSubmit={form.handleSubmit}
        className=" flex flex-row items-center"
      >
        {/* text input */}
        <input
          type="text"
          name="message"
          value={form.values.message}
          onChange={form.handleChange}
          className="flex-1 p-2 border border-muted bg-background rounded-lg"
          placeholder="Type a message..."
        />

        {/* image input */}
        <label htmlFor="file" className="h-5 w-5">
          <input
            id="file"
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={singleFile}
          />
        </label>

        {/* submit button */}
        <button
          type="submit"
          disabled={!form.values.message.trim() && !form.values.image}
          className="p-1 btn-accent disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </>
  );
};

export default ChatInputForm;
