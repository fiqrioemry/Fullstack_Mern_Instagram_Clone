/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Caption from "@/components/post/Caption";
import PostInput from "@/components/post/PostInput";
import Galleries from "@/components/post/Galleries";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import { useFormSchema } from "@/hooks/useFormSchema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";
import ShowComments from "@/components/post/ShowComments";
import LoadMoreButton from "@/components/post/LoadMoreButton";
import CommentsLoading from "../skeleton/CommentsLoading";

const ShowDisplay = ({ post }) => {
  const [limit, setLimit] = useState(5);
  const { createComment, getComments, totalComments, loading } =
    useCommentStore();

  const commentForm = useFormSchema(
    commentState,
    commentControl,
    createComment,
    post.postId
  );

  const handleLoadMore = () => {
    setLimit((prev) => prev + 5);
  };

  useEffect(() => {
    if (post.postId) {
      getComments(post.postId, limit);
    }
  }, [getComments, post.postId, limit]);

  return (
    <div className="mx-2 md:mx-8">
      <div className="flex md:flex-row flex-col py-2 md:py-8">
        <div className="w-full md:w-6/12 lg:w-7/12">
          <Galleries images={post.images} />
        </div>

        <div className="w-full md:w-6/12 lg:w-5/12 border border-muted">
          <div className="flex flex-col h-full">
            <div className="border-b border-muted">
              <PostAuthor data={post} />
            </div>

            {/* comment & reply */}
            <ScrollArea className="flex-1 border-b border-muted ">
              <div className="p-2">
                <Caption post={post} />

                <ShowComments form={commentForm} />

                {loading && <CommentsLoading />}

                {totalComments <= limit && (
                  <LoadMoreButton onClick={handleLoadMore} />
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

export default ShowDisplay;
