/* eslint-disable react/prop-types */
import Timestamp from "./Timestamp";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

const PostControl = ({ post }) => {
  return (
    <>
      <div className="flex gap-x-4">
        <Heart />
        <MessageCircle />
        <Bookmark />
      </div>
      <div className="text-sm">
        {post.likeCount !== 0 && <Button>{post.likeCount} Likes</Button>}
      </div>
      <Timestamp createdAt={post.createdAt} />
    </>
  );
};

export default PostControl;
