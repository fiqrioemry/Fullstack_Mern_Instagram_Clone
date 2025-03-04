import { useEffect } from "react";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import { usePostStore } from "@/store/usePostStore";
import ShowDisplay from "@/components/post-detail/ShowDisplay";
import PostDisplayLoading from "@/components/skeleton/PostDisplayLoading";

const ShowDetail = () => {
  const { id } = useParams();
  const { post, getPostDetail } = usePostStore();

  useEffect(() => {
    getPostDetail(id);
  }, [getPostDetail, id]);

  if (!post) return <PostDisplayLoading />;

  if (post.length === 0) return <NotFound />;

  return <ShowDisplay post={post} />;
};

export default ShowDetail;
