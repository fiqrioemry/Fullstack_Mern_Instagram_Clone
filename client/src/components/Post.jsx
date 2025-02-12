/* eslint-disable react/prop-types */
import Author from "./Author";
import Caption from "./Caption";
import { useEffect } from "react";
import Comments from "./Comments";
import Galleries from "./posts/Galleries";
import { useCommentStore } from "../store/useCommentStore";
import CommentsLoading from "./skeleton/CommentsLoading";
import { Bookmark, Heart, MessageCircle, Send, Smile } from "lucide-react";
import Timestamp from "./Timestamp";

const Post = ({ post, id }) => {
  const { getComments, comments, loading } = useCommentStore();

  useEffect(() => {
    getComments(id);
  }, [getComments, id]);

  return (
    <div className="content_margin border p-0">
      <div className="grid grid-cols-10 ">
        <div className="col-span-6">
          <Galleries images={post.images} />
        </div>
        <div className="col-span-4 ">
          <div className="border-b p-2">
            <Author user={post} />
          </div>
          <div className="p-2 overflow-y-scroll h-[21rem]">
            <Caption post={post} />
            {loading && <CommentsLoading />}
            {comments.length !== 0 && <Comments comments={comments} />}
          </div>
          <div className="border-t p-2">
            {/* Icons Row */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Heart className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
                <MessageCircle className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
                <Send className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
              </div>
              <Bookmark className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600" />
            </div>

            {/* Likes Count */}
            <p className="mt-2 text-sm font-semibold text-gray-900">
              {post.likes} Likes
            </p>

            {/* Post Date */}
            <p className="text-xs text-gray-500 mt-1">January 28</p>

            {/* Comment Input */}
            <div className="flex items-center border-t py-2">
              <Smile className="w-6 h-6" />
              <input
                type="text"
                className="flex-1 mx-2 text-sm focus:outline-none"
                placeholder="Add a comment..."
              />
              <button>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
