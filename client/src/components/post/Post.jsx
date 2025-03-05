/* eslint-disable react/prop-types */
import Content from "../post/Content";
import Comments from "./Comments";
import PostInput from "./PostInput";
import Galleries from "./Galleries";
import PostAuthor from "./PostAuthor";
import PostControl from "./PostControl";
import Avatar from "@/components/ui/Avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useLoadComments from "@/hooks/useLoadComments";
import LoadMoreButton from "@/components/post/LoadMoreButton";
import CommentsLoading from "@/components/skeleton/CommentsLoading";

const Post = ({ post }) => {
  const { limit, loading, comments, totalComments, handleLoadMore } =
    useLoadComments(post);

  return (
    <div className="h-[75vh] md:h-[95vh] flex md:flex-row flex-col border border-muted ">
      {/* Galeri Foto */}
      <div className="hidden md:block w-full md:w-6/12 lg:w-7/12">
        <Galleries images={post.images} />
      </div>

      <div className="w-full h-full md:w-6/12 lg:w-5/12 ">
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

          {/* post control : reply & saved*/}
          <div className="border-b border-muted px-2">
            <PostControl post={post} />
          </div>

          {/* post input : comment */}
          <div className="px-2">
            <PostInput postId={post.postId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
