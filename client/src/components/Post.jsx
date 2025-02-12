/* eslint-disable react/prop-types */
import Author from "./Author";
import { useEffect } from "react";
import Comments from "./Comments";
import Galleries from "./posts/Galleries";
import { useCommentStore } from "../store/useCommentStore";
import CommentsLoading from "./skeleton/CommentsLoading";

const Post = ({ post }) => {
  const { getComments, comments, loading } = useCommentStore();

  useEffect(() => {
    getComments(post.id);
  }, []);

  return (
    <div className="content_margin border p-0">
      <div className="grid grid-cols-10 ">
        <div className="col-span-6">
          <Galleries images={post.images} />
        </div>
        <div className="col-span-4 ">
          <div className="content_margin">
            <Author user={post} />
          </div>
          <div>{post.content}</div>
          <div>
            {loading ? <CommentsLoading /> : <Comments comments={comments} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
