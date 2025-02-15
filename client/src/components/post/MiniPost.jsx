/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { HeartIcon, MessageCircle } from "lucide-react";

const MiniPost = ({ post }) => {
  const location = useLocation();

  return (
    <div className="relative">
      <Link
        to={`/p/${post.postId}`}
        state={{ background: location }}
        className="post_card"
      >
        <div className="flex items-center gap-x-6">
          <div className="flex gap-x-2 text-white">
            {post.likes}
            <HeartIcon />
          </div>
          <div className="flex gap-x-2 text-white">
            {post.comments}
            <MessageCircle />
          </div>
        </div>
      </Link>
      <img
        className="w-full h-full object-cover"
        src={post.images[0]}
        alt="image"
      />
    </div>
  );
};

export default MiniPost;
