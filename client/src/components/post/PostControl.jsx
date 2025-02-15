/* eslint-disable react/prop-types */

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useFormSchema } from "../../hooks/useFormSchema";
import { usePostStore } from "../../store/usePostStore";

const PostControl = ({ post, formik }) => {
  const { likePost } = usePostStore();
  const likeState = { entityId: post.postId, entityType: "post" };
  const likeForm = useFormSchema(likeState, [], likePost);
  const handleComment = () => formik.setFieldValue("postId", post.postId);

  return (
    <div className="py-0 md:py-2 mt-1">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Heart
            onClick={likeForm.handleSubmit}
            className="w-6 h-6 cursor-pointer hover:text-gray-600"
            fill={post.isLiked ? "red" : "transparent"}
            stroke={post.isLiked ? "red" : "currentColor"}
            aria-label="Like Post"
          />
          <MessageCircle
            onClick={handleComment}
            className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600"
            aria-label="Comment on Post"
          />
          <Send
            className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600"
            aria-label="Share Post"
          />
        </div>
        <Bookmark
          className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600"
          aria-label="Save Post"
        />
      </div>
      {post.likes > 0 && (
        <p className="mt-2 text-sm font-semibold text-gray-900">
          {post.likes} likes
        </p>
      )}
    </div>
  );
};

export default PostControl;
