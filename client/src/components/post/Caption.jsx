/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Timestamp from "@/components/ui/Timestamp";

const Caption = ({ post }) => {
  return (
    <div className="flex items-start gap-3">
      <div>
        <img
          src={post.avatar}
          alt="User Avatar"
          className="w-9 h-9 overflow-hidden border-muted flex-shrink-0 border rounded-full"
        />
      </div>

      {/* Username & Content */}
      <div className="flex-1">
        <Link to={`${post.username}`} className="btn-secondary">
          {post.username}
        </Link>
        <div className="text-xs md:text-sm">{post.content}</div>
        <Timestamp createdAt={post.createdAt} />
      </div>
    </div>
  );
};

export default Caption;
