import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

const PostControl = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3 py-2">
          <Heart />
          <MessageCircle />
          <Send />
        </div>
        <Bookmark />
      </div>
      <div className="space-x-1 text-sm font-semibold py-2">125.000 Likes</div>
    </div>
  );
};

export default PostControl;
