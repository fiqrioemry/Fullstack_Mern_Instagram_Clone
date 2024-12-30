/* eslint-disable react/prop-types */
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

const PostControl = ({ like }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3 py-3">
          <Heart />
          <MessageCircle />
          <Send />
        </div>
        <Bookmark />
      </div>
      {like !== 0 && <div className="text-sm">125.000 Likes</div>}
      {like === 0 && <div className="text-sm">No likes yet</div>}
    </div>
  );
};

export default PostControl;
