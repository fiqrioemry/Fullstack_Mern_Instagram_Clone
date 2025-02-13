/* eslint-disable react/prop-types */
import Galleries from "@/components/post/Galleries";
import PostInput from "@/components/post/PostInput";
import { Link, useLocation } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";
import { useEffect } from "react";

const Posts = ({ post }) => {
  const location = useLocation();
  const { createComment } = useCommentStore();
  const commentForm = useFormSchema(
    commentState,
    commentControl,
    createComment,
    post.postId
  );

  useEffect(() => {
    commentForm.setValues((prevValues) => ({
      ...prevValues,
      postId: post.postId,
    }));
  }, [post.postId]);

  return (
    <div className="border-b">
      <PostAuthor data={post} />
      <Galleries images={post.images} />
      <PostControl post={post} />
      {post.comments > 0 && (
        <Link
          className="text-xs md:text-sm"
          to={`/p/${post.postId}`}
          state={{ background: location }}
        >
          view all {post.comments} comments
        </Link>
      )}
      <PostInput postId={post.postId} formik={commentForm} />
    </div>
  );
};

export default Posts;
