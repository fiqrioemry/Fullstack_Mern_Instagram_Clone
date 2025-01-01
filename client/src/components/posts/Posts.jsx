/* eslint-disable react/prop-types */

import Author from "../Author";
import PostControl from "../PostControl";
import Galleries from "../posts/Galleries";
import CommentForm from "../posts/CommentForm";
import MiniCaption from "../posts/MiniCaption";
import { Link, useLocation } from "react-router-dom";

const Posts = ({ posts }) => {
  const location = useLocation();

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div className="space-y-2 border-b" key={index}>
          <Author user={post} />
          <Galleries images={post.images} />
          <PostControl post={post} />
          <MiniCaption post={post} />
          <div>
            {post.commentCount !== 0 && (
              <Link to={`/p/${post.postId}`} state={{ background: location }}>
                View all {post.commentCount} comments
              </Link>
            )}
          </div>
          <CommentForm />
        </div>
      ))}
    </div>
  );
};

export default Posts;
