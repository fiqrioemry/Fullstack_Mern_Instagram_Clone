/* eslint-disable react/prop-types */
import Caption from "@/components/post/Caption";
import Comments from "@/components/post/Comments";
import Galleries from "@/components/post/Galleries";
import PostInput from "@/components/post/PostInput";
import useLoadComments from "@/hooks/useLoadComments";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadMoreButton from "@/components/post/LoadMoreButton";
import CommentsLoading from "@/components/skeleton/CommentsLoading";

const DetailDisplay = ({ post }) => {
  const {
    limit,
    loading,
    comments,
    commentForm,
    totalComments,
    handleLoadMore,
  } = useLoadComments(post);

  return (
    <div className="mx-2 md:mx-8">
      <div className="flex md:flex-row flex-col py-2 md:py-8">
        <div className="w-full md:w-6/12 lg:w-7/12">
          <Galleries images={post.images} />
        </div>

        <div className="h-screen w-full md:w-6/12 lg:w-5/12 border border-muted">
          <div className="flex flex-col h-full">
            <div className="border-b border-muted">
              <PostAuthor data={post} />
            </div>

            {/* comment & reply */}
            <ScrollArea className="flex-1 border-b border-muted ">
              <div className="p-2">
                <Caption post={post} />
                <Comments comments={comments} formik={commentForm} />
                <CommentsLoading loading={loading} />
                <LoadMoreButton
                  limit={limit}
                  state={comments}
                  loading={loading}
                  total={totalComments}
                  onClick={handleLoadMore}
                />
              </div>
            </ScrollArea>

            {/* post control : reply & saved*/}
            <div className="border-b border-muted px-2">
              <PostControl post={post} formik={commentForm} />
            </div>

            {/* input comment */}
            <div className="px-2">
              <PostInput postId={post.postId} formik={commentForm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDisplay;
