/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Caption from "@/components/post/Caption";
import Comments from "@/components/post/Comments";
import PostInput from "@/components/post/PostInput";
import Galleries from "@/components/post/Galleries";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import { useFormSchema } from "@/hooks/useFormSchema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";
import CommentsLoading from "@/components/skeleton/CommentsLoading";

const PostDisplay = ({ post }) => {
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
    <div className="m-10">
      <div className="flex md:flex-row flex-col">
        <div className="w-full md:w-6/12 lg:w-7/12">
          <Galleries images={post.images} />
        </div>

        <div className="w-full md:w-6/12 lg:w-5/12 border border-muted">
          <div className="flex flex-col h-full">
            <div className="border-b border-muted">
              <PostAuthor data={post} />
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
    </div>
  );
};

export default PostDisplay;
