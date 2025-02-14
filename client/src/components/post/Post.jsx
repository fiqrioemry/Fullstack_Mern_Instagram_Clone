/* eslint-disable react/prop-types */
import Caption from "./Caption";
import { useEffect } from "react";
import Comments from "./Comments";
import PostInput from "./PostInput";
import Galleries from "./Galleries";
import PostAuthor from "./PostAuthor";
import PostControl from "./PostControl";
import { useFormSchema } from "@/hooks/useFormSchema";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";
import CommentsLoading from "@/components/skeleton/CommentsLoading";

const Post = ({ post }) => {
  const { createComment, getComments, loadingComment } = useCommentStore();
  const commentForm = useFormSchema(
    commentState,
    commentControl,
    createComment,
    post.postId
  );

  useEffect(() => {
    if (post.postId) {
      getComments(post.postId);
    }
  }, [post.postId]);

  return (
    <div>
      <div className="grid grid-cols-10 ">
        <div className="col-span-6">
          <Galleries images={post.images} />
        </div>
        <div className="col-span-4">
          <PostAuthor data={post} />
          <div className="border-t">
            <div className="overflow-y-scroll h-[14rem] md:h-[22rem] p-2">
              <Caption post={post} />
              {loadingComment ? (
                <CommentsLoading />
              ) : (
                <Comments formik={commentForm} />
              )}
            </div>
          </div>
          <div className="border-t p-2">
            <PostControl post={post} formik={commentForm} />
          </div>
          <div className="border-t p-2">
            <PostInput postId={post.postId} formik={commentForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
