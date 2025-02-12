/* eslint-disable react/prop-types */
import Author from "./Author";
import Caption from "./Caption";
import { useEffect } from "react";
import Comments from "./Comments";
import PostControl from "./PostControl";
import InputComment from "./InputComment";
import Galleries from "./posts/Galleries";
import CommentsLoading from "./skeleton/CommentsLoading";
import { useCommentStore } from "../store/useCommentStore";

const Post = ({ post, id }) => {
  const { getComments, comments, loading } = useCommentStore();

  useEffect(() => {
    getComments(id);
  }, [getComments, id]);

  return (
    <div className="border">
      <div className="grid grid-cols-10 ">
        <div className="col-span-6">
          <Galleries images={post.images} />
        </div>
        <div className="col-span-4 ">
          <Author user={post} />
          <div className="border-t">
            <div className="overflow-y-scroll h-[21rem] p-2">
              <Caption post={post} />
              {loading && <CommentsLoading />}
              {comments.length !== 0 && <Comments comments={comments} />}
            </div>
          </div>
          <div className="border-t p-2">
            <PostControl post={post} />
          </div>
          <div className="border-t p-2">
            <InputComment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
