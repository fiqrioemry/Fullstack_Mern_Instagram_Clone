/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Caption from "./Caption";
import Comments from "./Comments";
import PostInput from "./PostInput";
import Galleries from "./Galleries";
import PostAuthor from "./PostAuthor";
import PostControl from "./PostControl";
import { useFormSchema } from "@/hooks/useFormSchema";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="grid grid-cols-10 border border-muted overflow-hidden ">
      {/* Galeri Foto */}
      <div className="hidden md:block lg:col-span-6 h-[90vh] ">
        <Galleries images={post.images} />
      </div>

      <div className="col-span-10 lg:col-span-4 h-[80vh] md:h-[90vh]">
        <div className="flex flex-col h-full">
          <div className="md:block hidden border-b border-muted">
            <PostAuthor data={post} />
          </div>

          {/* for mobile view */}
          <div className="block md:hidden py-4 border-b border-muted">
            <div className="text-center">
              <h4>Comments</h4>
            </div>
          </div>

          {/* comment & reply */}
          <ScrollArea className="flex-1 overflow-y-auto border-b border-muted ">
            <div className="p-2">
              <Caption post={post} />
              {loadingComment ? (
                <CommentsLoading />
              ) : (
                <Comments formik={commentForm} />
              )}
            </div>
          </ScrollArea>

          {/* post control : reply & saved*/}
          <div className="border-b border-muted px-2">
            <PostControl post={post} formik={commentForm} />
          </div>

          {/* post input : comment */}
          <div className="px-2">
            <PostInput postId={post.postId} formik={commentForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
