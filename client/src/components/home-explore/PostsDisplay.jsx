/* eslint-disable react/prop-types */
import Galleries from "@/components/post/Galleries";
import PostInput from "@/components/post/PostInput";
import { Link, useLocation } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";

const PostsDisplay = ({ post }) => {
  const location = useLocation();
  const { createComment } = useCommentStore();
  const commentForm = useFormSchema(
    commentState,
    commentControl,
    createComment,
    post.postId
  );

  return (
    <div className="border-b border-muted ">
      <PostAuthor data={post} />

      <div className="h-96">
        <Galleries images={post.images} />
      </div>

      <PostControl post={post} formik={commentForm} />
      <div className="text-foreground">{post.content}</div>
      {post.comments > 0 && (
        <Link
          to={`/p/${post.postId}`}
          state={{ background: location }}
          className="text-xs md:text-sm text-muted-foreground"
        >
          View all {post.comments} comments
        </Link>
      )}
      <PostInput postId={post.postId} formik={commentForm} />
    </div>
  );
};

export default PostsDisplay;
