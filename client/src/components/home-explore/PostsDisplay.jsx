/* eslint-disable react/prop-types */
import ViewComments from "./ViewComments";
import Galleries from "@/components/post/Galleries";
import PostInput from "@/components/post/PostInput";
import PostAuthor from "@/components/post/PostAuthor";
import PostControl from "@/components/post/PostControl";
import PostsLoading from "@/components/skeleton/PostsLoading";

const PostsDisplay = ({ posts, loading }) => {
  return (
    <div>
      {posts.map((post) => (
        <div className="border-b border-muted" key={post.postId}>
          <PostAuthor data={post} />
          <div className="h-96">
            <Galleries images={post.images} />
          </div>
          <PostControl post={post} />
          <ViewComments post={post} />
          <PostInput postId={post.postId} />
        </div>
      ))}

      {loading && <PostsLoading />}
    </div>
  );
};

export default PostsDisplay;
