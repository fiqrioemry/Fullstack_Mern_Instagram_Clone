/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MiniCaption = ({ post }) => {
  return (
    <div className="text-sm space-x-2">
      {post.content && (
        <>
          <Link href={`/dashboard/${post.username}`} className="font-semibold">
            {post.username}
          </Link>
          <span>{post.content}</span>
        </>
      )}
    </div>
  );
};

export default MiniCaption;
