/* eslint-disable react/prop-types */
import Comments from "@/components/post/Comments";
import Galleries from "@/components/post/Galleries";
import PostInput from "@/components/post/PostInput";
import useLoadComments from "@/hooks/useLoadComments";
import PostAuthor from "@/components/post/PostAuthor";

import { ScrollArea } from "@/components/ui/scroll-area";
import LoadMoreButton from "@/components/post/LoadMoreButton";
import CommentsLoading from "@/components/skeleton/CommentsLoading";
import Avatar from "../ui/Avatar";
import Content from "../post/Content";
import PostControl from "../post/PostControl";

const DetailDisplay = ({ post }) => {
  const { limit, loading, comments, totalComments, handleLoadMore } =
    useLoadComments(post);

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

            <ScrollArea className="flex-1 border-b border-muted p-2">
              <div className="flex items-start gap-3">
                <Avatar avatar={post.avatar} />
                <Content data={post} />
              </div>
              <Comments comments={comments} />
              <CommentsLoading loading={loading[post.postId]} />
              <LoadMoreButton
                limit={limit}
                total={totalComments}
                onClick={handleLoadMore}
                loading={loading[post.postId]}
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
