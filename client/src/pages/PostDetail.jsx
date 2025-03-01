import { useEffect } from "react";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import { usePostStore } from "@/store/usePostStore";
import PostDisplay from "@/components/post-detail/PostDisplay";
import PostDisplayLoading from "@/components/skeleton/PostDisplayLoading";

const PostDetail = () => {
  const { id } = useParams();
  const { post, getPostDetail } = usePostStore();

  useEffect(() => {
    getPostDetail(id);
  }, [getPostDetail, id]);

  if (!post) return <PostDisplayLoading />;

  if (post.length === 0) return <NotFound />;

  return (
    <div className="w-full mx-2 md:mx-4 lg:mx-8 ">
      <PostDisplay post={post} />
    </div>
  );
};

export default PostDetail;
