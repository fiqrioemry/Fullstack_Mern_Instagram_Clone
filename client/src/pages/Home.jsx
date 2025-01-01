import { useEffect } from "react";
import Posts from "../components/posts/Posts";
import { useUserStore } from "../store/useUserStore";
import { usePostStore } from "../store/usePostStore";
import RecommendBox from "../components/RecommendBox";
import { useProvider } from "../context/GlobalProvider";
import DetailPostModal from "../components/modal/DetailPostModal";
import PostsSkeleton from "../components/skeleton/PostsSkeleton";
import RecommendSkeleton from "../components/skeleton/RecommendSkeleton";

const Home = () => {
  const { userData } = useProvider();
  const {
    followings,
    recommend,
    getFollowings,
    isFollowingLoading,
    getFollowRecommend,
  } = useUserStore();
  const { getFollowingPosts, message, followingPosts } = usePostStore();

  console.log(userData);

  useEffect(() => {
    getFollowings(userData.userId), getFollowingPosts();
    getFollowRecommend();
  }, []);

  return (
    <div className="flex">
      <DetailPostModal />
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem] px-2">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 md:py-12 py-6">
              {isFollowingLoading && <PostsSkeleton />}
              {!isFollowingLoading && followingPosts.length === 0 && (
                <RecommendBox
                  followings={followings}
                  recommend={recommend}
                  message={message}
                />
              )}
              {!isFollowingLoading && followingPosts.length !== 0 && (
                <Posts posts={followingPosts} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[26rem] h-screen xl:block hidden">
        <div className=" py-6 px-12">
          {isFollowingLoading && <RecommendSkeleton />}

          {!isFollowingLoading && followingPosts.length !== 0 && (
            <div className="space-y-6">
              <RecommendBox
                followings={followings}
                recommend={recommend}
                message="Suggested For you"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
