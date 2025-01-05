/* eslint-disable react/prop-types */

import Author from "../Author";
import { Button } from "../ui/button";
import PostControl from "../PostControl";
import Galleries from "../posts/Galleries";
import { useNavigate } from "react-router-dom";
import CommentForm from "../posts/CommentForm";
import MiniCaption from "../posts/MiniCaption";
import { useProvider } from "../../context/GlobalProvider";

const Posts = ({ posts }) => {
  const navigate = useNavigate();
  const { setMount, setBackground } = useProvider();

  const handleNavigate = (postId) => {
    setMount(true);
    setBackground("/");
    navigate(`/p/${postId}`);
  };

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
              <Button onClick={() => handleNavigate(post.postId)}>
                View all {post.commentCount} comments
              </Button>
            )}
          </div>
          <CommentForm />
        </div>
      ))}
    </div>
  );
};

export default Posts;
