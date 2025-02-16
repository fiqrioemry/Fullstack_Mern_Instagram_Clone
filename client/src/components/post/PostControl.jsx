/* eslint-disable react/prop-types */

import { formatDateToISO } from "../../lib/utils";
import { usePostStore } from "@/store/usePostStore";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

const PostControl = ({ post, formik }) => {
  const { likePost } = usePostStore();
  const handleLikePost = () => likePost(post.postId);
  const handleComment = () => formik.setFieldValue("postId", post.postId);
  console.log(post.createdAt);
  return (
    <div className="mt-2 py-2 space-y-1">
      <div className="flex-between">
        <div className="flex gap-4">
          <Heart
            onClick={handleLikePost}
            className="btn-secondary"
            fill={post.isLiked ? "red" : "transparent"}
            stroke={post.isLiked ? "red" : "currentColor"}
            aria-label="Like Post"
          />
          <MessageCircle
            onClick={handleComment}
            className="btn-secondary"
            aria-label="Comment on Post"
          />
        </div>
        <Bookmark className="btn-secondary" aria-label="Save Post" />
      </div>
      <div>
        {post.likes > 0 && (
          <span className="text-foreground font-medium">
            {post.likes} likes
          </span>
        )}
      </div>
      <div className="text-sm md:text-md">
        {formatDateToISO(post.createdAt)}
      </div>
    </div>
  );
};

export default PostControl;
