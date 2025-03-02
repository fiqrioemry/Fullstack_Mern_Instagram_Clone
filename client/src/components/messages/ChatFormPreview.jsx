/* eslint-disable react/prop-types */
import { File, Trash } from "lucide-react";

const ChatFormPreview = ({ formData, handleRemove }) => {
  return (
    <>
      {formData.file && (
        <div className="flex items-center gap-4 border p-2 mt-2 rounded-md">
          {formData.file.type === "image" && (
            <img
              src={formData.file.path}
              alt="preview"
              className="w-20 h-20 object-cover rounded-md"
            />
          )}
          {formData.file.type === "video" && (
            <div>
              <h3>Video Preview:</h3>
              <video width="300" controls>
                <source src={formData.file.path} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {formData.file.type === "document" && (
            <div className="flex items-center gap-2">
              <File />
              <span>{formData.file.name}</span>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="btn btn-error btn-sm"
          >
            <Trash />
          </button>
        </div>
      )}
    </>
  );
};

export default ChatFormPreview;
