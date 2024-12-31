/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import PostContent from "./PostContent";
import PostControl from "./PostControl";
import CommentForm from "../form/CommentForm";
import PostImagesDisplay from "./PostImagesDisplay";
import { initialCommentConfig, initialCommentForm } from "../../config";

const Posts = ({ posts }) => {
  const location = useLocation();
  return (
    <div>
      {posts.map((post, index) => (
        <div className="border-b" key={index}>
          <PostContent user={post.User} />
          <PostImagesDisplay images={post.PostGalleries} />
          <PostControl like={post.likeCount} />
          {post.commentCount === 0 && (
            <Link to={`/p/${post.id}`} state={{ background: location }}>
              View all {post.commentCount} comments
            </Link>
          )}

          <CommentForm
            initialFormConfig={initialCommentConfig}
            initialFormState={initialCommentForm}
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;
