/* eslint-disable react/prop-types */
import { useCommentStore } from "@/store/useCommentStore";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

const PostControl = ({ post, formik }) => {
  const { likePost } = useCommentStore();
  return (
    <div className="py-0 md:py-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Heart
            onClick={() => likePost(post.postId)}
            className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600"
          />

          <MessageCircle
            onClick={() => {
              formik.setFieldValue("postId", post.postId);
            }}
            className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600"
          />

          <Send className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
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
