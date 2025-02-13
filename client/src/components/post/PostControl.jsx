/* eslint-disable react/prop-types */
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

const PostControl = ({ post, formik }) => {
  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Heart className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
          <button onClick={() => formik.setFieldValue("postId", post.postId)}>
            <MessageCircle className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
          </button>

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
