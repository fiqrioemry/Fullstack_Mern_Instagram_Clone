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
    <div className="w-full mx-2 md:mx-12 pt-8 ">
      <Post post={post} />
    </div>
  );
};

export default PostDetail;
