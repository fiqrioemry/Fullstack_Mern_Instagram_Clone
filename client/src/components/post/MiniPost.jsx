/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Galleries from "./Galleries";
import { HeartIcon, MessageCircle } from "lucide-react";

const MiniPost = ({ post }) => {
  return (
    <Link
      className="relative"
      to={`p/${post.postId}`}
      state={{ background: location }}
    >
      <div className="post_card">
        <div className="flex items-center gap-x-6">
          <div className="flex gap-x-2">
            {post.likes}
            <HeartIcon />
          </div>
          <div className="flex gap-x-2">
            {post.comments}
            <MessageCircle />
          </div>
        </div>
      </div>
      <Galleries images={post.images} />
    </Link>
  );
};

export default MiniPost;
