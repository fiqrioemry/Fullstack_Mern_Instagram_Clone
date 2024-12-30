import { useEffect } from "react";
import Posts from "../components/post/Posts";
import { usePostStore } from "../store/usePostStore";
import { useFollowStore } from "../store/useFollowStore";
import DetailPostModal from "../components/modal/DetailPostModal";
import PostsLoadingSkeleton from "../components/skeleton/PostsLoadingSkeleton";
import RecommendBoxSkeleton from "../components/skeleton/RecommendBoxSkeleton";
import RecommendBox from "../components/RecommendBox";

const Home = () => {
  const { getFollowRecommendations, isFollowLoading, recommendUsers } =
    useFollowStore();
  const { getAllFollowingPosts, isPostLoading, message, followingPosts } =
    usePostStore();

  useEffect(() => {
    getAllFollowingPosts();
    getFollowRecommendations();
  }, []);

  return (
    <div className="flex">
      <DetailPostModal />
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem]">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 md:py-12 py-6">
              {isPostLoading && <PostsLoadingSkeleton />}
              {!isPostLoading && !followingPosts.length && (
                <RecommendBox recommend={recommendUsers} message={message} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[26rem] h-screen xl:block hidden">
        <div className=" py-6 px-12">
          {isFollowLoading && (
            <div className="space-y-6">
              <RecommendBoxSkeleton />
              <RecommendBoxSkeleton />
              <RecommendBoxSkeleton />
            </div>
          )}

          {!isFollowLoading && !followingPosts.length && (
            <div className="space-y-6">
              <RecommendBox
                recommend={recommendUsers}
                message={"Suggested For you"}
              />
            </div>
          )}

          {!isFollowLoading && followingPosts.length && (
            <div className="space-y-6">
              <RecommendBox
                recommend={recommendUsers}
                message={"Suggested For you"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
