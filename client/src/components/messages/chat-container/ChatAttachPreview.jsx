/* eslint-disable react/prop-types */
import Image from "@/components/ui/Image";
import { X } from "lucide-react";

const ChatAttachPreview = ({ form }) => {
  return (
    <>
      {form.values.image && (
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
    </>
  );
};

export default ChatAttachPreview;
