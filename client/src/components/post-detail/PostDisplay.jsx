/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { createComment, getComments, loadingComment } = useCommentStore();
  const commentForm = useFormSchema(
    commentState,
    commentControl,
    createComment,
    post.postId
  );

  const handlePrevious = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (post.postId) {
      getComments(post.postId);
    }
  }, [getComments, post.postId]);

  return (
    <div className="h-screen flex flex-col pb-[4rem] md:pb-12 lg:pb-8">
      <div className="py-4">
        <ArrowLeft onClick={handlePrevious} />
      </div>
      <div className="flex flex-1 md:flex-row flex-col border border-muted overflow-hidden">
        {/* Galeri Foto */}
        <div className="w-full md:w-6/12 lg:w-7/12">
          <div className="h-full place-content-center bg-secondary">
            <Galleries images={post.images} />
          </div>
        </div>

        <div className="w-full md:w-6/12 lg:w-5/12">
          <div className="flex flex-col h-[60vh] md:h-full">
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
