/* eslint-disable react/prop-types */
import Caption from "./Caption";
import { useEffect } from "react";
import Comments from "./Comments";
import PostInput from "./PostInput";
import Galleries from "./Galleries";
import PostAuthor from "./PostAuthor";
import PostControl from "./PostControl";
import { useCommentStore } from "@/store/useCommentStore";
import CommentsLoading from "@/components/skeleton/CommentsLoading";

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
        <div className="col-span-4">
          <PostAuthor data={post} />
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
            <PostInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
