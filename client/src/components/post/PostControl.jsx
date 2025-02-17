/* eslint-disable react/prop-types */

import { formatDateToISO } from "../../lib/utils";
import { usePostStore } from "@/store/usePostStore";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

const PostControl = ({ post, formik }) => {
  const { likePost } = usePostStore();
  const handleLikePost = () => likePost(post.postId);
  const handleComment = () => formik.setFieldValue("postId", post.postId);

  return (
    <div className="space-y-1">
      <div className="flex-between mt-3">
        <div className="flex gap-4">
          <Heart
            aria-label="Like Post"
            onClick={handleLikePost}
            className="btn-secondary"
            fill={post.isLiked ? "red" : "transparent"}
            stroke={post.isLiked ? "red" : "currentColor"}
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
