import { useEffect } from "react";
import Posts from "../components/post/Posts";
import { usePostStore } from "../store/usePostStore";
import DetailPostModal from "../components/modal/DetailPostModal";
import { useFollowStore } from "../store/useFollowStore";
import PostsLoadingSkeleton from "../components/skeleton/PostsLoadingSkeleton";
import { Button } from "../components/ui/button";

const Home = () => {
  const { getFollowRecommendations, recommendUsers } = useFollowStore();
  const { getAllFollowingPosts, message, followingPosts } = usePostStore();

  useEffect(() => {
    getAllFollowingPosts();
    getFollowRecommendations();
  }, []);

  return (
    <div className="flex">
      <div className="flex-grow flex justify-center">
        <DetailPostModal />
        <div className="w-full max-w-[30em] mt-12 mb-12 md:mt-6 md:mb-6  space-y-6 py-6 md:py-0">
          {recommendUsers ? (
            <PostsLoadingSkeleton />
          ) : (
            <Posts
              message={message}
              posts={getAllFollowingPosts}
              recommend={recommendUsers}
            />
          )}
        </div>
      </div>
      <div className="w-[22rem] xl:flex justify-center hidden ">
        <div className="px-12 space-y-4 bg-red-500 ">
          <div className="w-full p-2 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 rounded-full bg-red-500"></div>
                <div className="text-sm">
                  <div className="font-semibold">arya.ketaren</div>
                  <div className="font-normal">Suggested for you</div>
                </div>
              </div>
              <div>
                <Button variant="custom" size="md">
                  Follow
                </Button>
              </div>
            </div>
          </div>

          <div className="w-96 p-2 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 rounded-full bg-red-500"></div>
                <div className="text-sm">
                  <div className="font-semibold">arya.ketaren</div>
                  <div className="font-normal">Suggested for you</div>
                </div>
              </div>
              <div>
                <Button variant="custom" size="md">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
