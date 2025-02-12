import { useEffect } from "react";
import Posts from "../components/post/Posts";
import { usePostStore } from "../store/usePostStore";
import PostsSkeleton from "../components/skeleton/PostsSkeleton";

const Explore = () => {
  const { getPublicPosts, posts, loading } = usePostStore();

  useEffect(() => {
    getPublicPosts();
  }, [getPublicPosts]);
  console.log(posts);
  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem] px-2">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 py-6">
              {loading ? <PostsSkeleton /> : <Posts posts={posts} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
