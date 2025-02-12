/* eslint-disable react/prop-types */

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

const PostControl = ({ post }) => {
  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Heart className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
          <MessageCircle className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
          <Send className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
      </div>

      <p className="mt-2 text-sm font-semibold text-gray-900">
        {post.likes} Likes
      </p>

      <p className="text-xs text-gray-500 mt-1">January 28</p>
    </div>
  );
};

export default PostControl;
