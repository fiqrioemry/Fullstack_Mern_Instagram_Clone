import { useEffect } from "react";
import Posts from "../components/post/Posts";
import { usePostStore } from "../store/usePostStore";
import DetailPostModal from "../components/modal/DetailPostModal";
import PostsLoadingSkeleton from "../components/skeleton/PostsLoadingSkeleton";
import RecommendBoxSkeleton from "../components/skeleton/RecommendBoxSkeleton";
import RecommendBox from "../components/RecommendBox";
import { useProvider } from "../context/GlobalProvider";
import { useUserStore } from "../store/useUserStore";

const Home = () => {
  const { userData } = useProvider();
  const {
    followings,
    recommend,
    getFollowings,
    isFollowingLoading,
    getFollowRecommend,
  } = useUserStore();
  const { getFollowingPosts, isPostsLoading, message, followingPosts } =
    usePostStore();

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
              {isFollowingLoading && <PostsLoadingSkeleton />}
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
          {isFollowingLoading && (
            <div className="space-y-6 ">
              <RecommendBoxSkeleton />
              <RecommendBoxSkeleton />
              <RecommendBoxSkeleton />
            </div>
          )}

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
