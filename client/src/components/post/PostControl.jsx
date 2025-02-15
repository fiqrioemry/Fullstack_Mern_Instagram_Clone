/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { useCommentStore } from "@/store/useCommentStore";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

const PostControl = ({ post, formik }) => {
  const { likePost } = useCommentStore();

  const handleLike = () => likePost(post.postId);
  const handleComment = () => formik.setFieldValue("postId", post.postId);

  return (
    <div className="py-0 md:py-2 mt-1">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Heart
            onClick={handleLike}
            className={cn(
              post.isLiked ? "bg-red-500 text-red-500" : "bg-transparent",
              "w-6 h-6  cursor-pointer bg-red-500 hover:text-gray-600"
            )}
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
