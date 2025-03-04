/* eslint-disable react/prop-types */
import Caption from "@/components/post/Caption";
import Comments from "@/components/post/Comments";
import PostInput from "@/components/post/PostInput";
import useLoadComments from "@/hooks/useLoadComments";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import { ScrollArea } from "@/components/ui/scroll-area";
import DetailDisplayLoading from "@/components/skeleton/DetailDisplayLoading";
import LoadMoreButton from "@/components/post/LoadMoreButton";
import CommentsLoading from "@/components/skeleton/CommentsLoading";

const DetailDisplay = ({ post }) => {
  const {
    limit,
    loading,
    comments,
    commentRef,
    commentForm,
    totalComments,
    handleLoadMore,
  } = useLoadComments(post);

  if (!comments) return <DetailDisplayLoading />;

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-muted">
        <PostAuthor data={post} />
      </div>

      {/* comment & reply */}
      <ScrollArea className="flex-1 border-b border-muted ">
        <div className="p-2">
          <Caption post={post} />
          <Comments comments={comments} />
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

      {/* input comment */}
      <div className="px-2">
        <PostInput postId={post.postId} formik={commentForm} />
      </div>
    </div>
  );
};

export default DetailDisplay;
