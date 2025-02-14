import { useEffect } from "react";
import Post from "@/components/post/Post";
import { useParams } from "react-router-dom";
import { usePostStore } from "@/store/usePostStore";
import PostLoading from "@/components/skeleton/PostLoading";

const PostDetail = () => {
  const { id } = useParams();
  const { post, getPostDetail, loading } = usePostStore();
  console.log(post);
  useEffect(() => {
    getPostDetail(id);
  }, [getPostDetail, id]);

  return (
    <div className="flex justify-center">
      <div className="max-w-2xl md:max-w-4xl w-full">
        <div className="mt-12 md:mt-0 py-6 space-y-6">
          <div>{loading ? <PostLoading /> : <Post post={post} />}</div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
