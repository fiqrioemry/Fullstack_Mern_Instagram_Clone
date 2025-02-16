/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Caption from "./Caption";
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
  }, [getComments, post.postId]);

  return (
    <div className="grid grid-cols-10 h-full">
      {/* Galeri Foto */}
      <div className="col-span-6">
        <Galleries images={post.images} />
      </div>

      {/* Bagian kanan (Penulis, Caption, Komentar, dll.) */}
      <div className="col-span-4 flex flex-col h-full">
        <PostAuthor data={post} />

        {/* Bagian Caption & Komentar harus bisa memenuhi ruang yang tersedia */}
        <div className="border-t border-muted-foreground/60 flex-grow overflow-hidden">
          <div className="overflow-y-auto scrollbar-hide h-60 md:h-72 lg:h-96 p-2">
            <Caption post={post} />
            {loadingComment ? (
              <CommentsLoading />
            ) : (
              <Comments formik={commentForm} />
            )}
          </div>
        </div>

        {/* Bagian Kontrol Post */}
        <div className="border-t border-muted-foreground/60 p-2">
          <PostControl post={post} formik={commentForm} />
        </div>

        {/* Bagian Input Komentar */}
        <div className="border-t border-muted-foreground/60 p-2">
          <PostInput postId={post.postId} formik={commentForm} />
        </div>
      </div>
    </div>
  );
};

export default Post;
