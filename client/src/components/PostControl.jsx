/* eslint-disable react/prop-types */
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import Timestamp from "./Timestamp";

const PostControl = ({ post }) => {
  return (
    <>
      <div className="flex gap-x-4">
        <Heart />
        <MessageCircle />
        <Bookmark />
      </div>
      <div className="text-sm">
        {post.likeCount !== 0 && <button>{post.likeCount} Likes</button>}
      </div>
      <Timestamp createdAt={post.createdAt} />
    </>
  );
};

export default PostControl;
