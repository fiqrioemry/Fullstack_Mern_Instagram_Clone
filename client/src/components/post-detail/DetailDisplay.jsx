/* eslint-disable react/prop-types */
import Avatar from "@/components/ui/Avatar";
import Content from "@/components/post/Content";
import Comments from "@/components/post/Comments";
import Galleries from "@/components/post/Galleries";
import PostInput from "@/components/post/PostInput";
import useLoadComments from "@/hooks/useLoadComments";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadMoreComment from "@/components/post/LoadMoreComment";

const DetailDisplay = ({ post }) => {
  const { limit, loading, comments, totalComments, handleLoadMore } =
    useLoadComments(post);

  return (
    <div className="mx-2 md:mx-8 h-screen flex items-center">
      <div className="h-[90vh] flex md:flex-row flex-col">
        <div className="h-full w-full md:w-6/12 lg:w-7/12">
          <Galleries images={post.images} />
        </div>

        <div className="h-full w-full md:w-6/12 lg:w-5/12 border border-muted">
          <div className="flex flex-col h-full">
            <div className="border-b border-muted">
              <PostAuthor data={post} />
            </div>

            <ScrollArea className="flex-1 border-b border-muted p-2">
              <div className="flex items-start gap-2 mb-2">
                <Avatar avatar={post.avatar} />
                <Content data={post} />
              </div>
              <Comments comments={comments} loading={loading[post.postId]} />
              <LoadMoreComment
                limit={limit}
                total={totalComments}
                onClick={handleLoadMore}
              />
            </ScrollArea>

            <div className="border-b border-muted px-2">
              <PostControl post={post} />
            </div>

            <div className="px-2">
              <PostInput postId={post.postId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDisplay;
