/* eslint-disable react/prop-types */
import Galleries from "@/components/post/Galleries";
import PostInput from "@/components/post/PostInput";
import { Link, useLocation } from "react-router-dom";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";

const Posts = ({ posts }) => {
  const location = useLocation();

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div className="space-y-2 border-b" key={index}>
          <PostAuthor data={post} />
          <Galleries images={post.images} />
          <PostControl post={post} />
          <div>
            {post.comments > 0 && (
              <Link
                className="text-xs md:text-sm"
                to={`/p/${post.postId}`}
                state={{ background: location }}
              >
                View all {post.comments} comments
              </Link>
            )}
          </div>
          <PostInput />
        </div>
      ))}
    </div>
  );
};

export default Posts;
