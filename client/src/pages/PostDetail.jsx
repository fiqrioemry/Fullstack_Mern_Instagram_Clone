import { useEffect } from "react";
import NotFound from "./NotFound";
import Post from "@/components/post/Post";
import { useParams } from "react-router-dom";
import { usePostStore } from "@/store/usePostStore";
import PostLoading from "@/components/skeleton/PostLoading";

const PostDetail = () => {
  const { id } = useParams();
  const { post, getPostDetail } = usePostStore();

  useEffect(() => {
    getPostDetail(id);
  }, [getPostDetail, id]);

  if (!post) return <PostLoading />;

  if (post.length === 0) return <NotFound />;

  return (
    <div className="min-h-screen">
      <div className="px-2 md:px-10 md:py-6 py-20">
        <Post post={post} />
      </div>
    </div>
  );
};

export default PostDetail;
