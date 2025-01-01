import { useEffect } from "react";
import Post from "../components/posts/Post";
import { usePostStore } from "../store/usePostStore";
import { Navigate, useParams } from "react-router-dom";
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

  if (!post) return <Navigate to="/" />;

  return (
    <div className="flex justify-center">
      <div className="max-w-2xl md:max-w-4xl w-full">
        <div className="mt-12 md:mt-0 py-6 space-y-6">
          <div>
            {post.length === 0 ? (
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
