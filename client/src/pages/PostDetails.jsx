import { useEffect } from "react";
import NotFound from "./NotFound";
import Post from "../components/posts/Post";
import { useParams } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";
import { useCommentStore } from "../store/useCommentStore";
import PostSkeleton from "../components/skeleton/PostSkeleton";

const PostDetails = () => {
  const { id } = useParams();
  const { post, getPostDetail } = usePostStore();
  const { comments, getComments } = useCommentStore();

  useEffect(() => {
    getPostDetail(id);
    getComments(id);
  }, []);

  if (post && post.length === 0) return <NotFound />;

  return (
    <div className="flex justify-center">
      <div className="max-w-2xl md:max-w-4xl w-full">
        <div className="mt-12 md:mt-0 py-6 space-y-6">
          <div>
            {!post ? (
              <PostSkeleton />
            ) : (
              <Post post={post} comments={comments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
