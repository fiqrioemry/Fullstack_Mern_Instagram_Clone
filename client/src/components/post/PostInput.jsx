import { Smile } from "lucide-react";
const PostInput = () => {
  return (
    <div className="flex items-center">
      <Smile className="w-6 h-6" />
      <input
        type="text"
        className="flex-1 mx-2 text-sm focus:outline-none"
        placeholder="Add a comment..."
      />
      <button>Post</button>
    </div>
  );
};

export default PostInput;
