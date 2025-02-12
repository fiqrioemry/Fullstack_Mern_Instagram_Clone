import { useEffect } from "react";
import Posts from "../components/posts/Posts";
import { usePostStore } from "../store/usePostStore";
import PostsSkeleton from "../components/skeleton/PostsSkeleton";

const Home = () => {
  const { getPostsFromFollowings, posts, loading } = usePostStore();

  useEffect(() => {
    getPostsFromFollowings();
  }, [getPostsFromFollowings]);

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
      <div className="w-[26rem] xl:block hidden">
        <div className="py-6 px-12">
          {/* {!followingPosts && <RecommendBox user={userData} />} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
