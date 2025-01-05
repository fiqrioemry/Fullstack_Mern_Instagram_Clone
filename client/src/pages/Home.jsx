import { useEffect } from "react";
import Posts from "../components/posts/Posts";
import { usePostStore } from "../store/usePostStore";
import RecommendBox from "../components/RecommendBox";
import { useProvider } from "../context/GlobalProvider";
import PostsSkeleton from "../components/skeleton/PostsSkeleton";

const Home = () => {
  const { userData } = useProvider();
  const { getFollowingPosts, message, followingPosts, isPostLoading } =
    usePostStore();

  useEffect(() => {
    getFollowingPosts();
  }, []);

  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem] px-2">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 py-6">
              {isPostLoading ? (
                <PostsSkeleton />
              ) : followingPosts.length === 0 ? (
                <RecommendBox message={message} />
              ) : (
                <Posts posts={followingPosts} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[26rem] xl:block hidden">
        <div className="py-6 px-12">
          {!followingPosts && <RecommendBox user={userData} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
