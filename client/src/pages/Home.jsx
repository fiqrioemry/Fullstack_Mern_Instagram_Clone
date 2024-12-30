import { useEffect } from "react";
import Posts from "../components/post/Posts";
import { usePostStore } from "../store/usePostStore";
import DetailPostModal from "../components/modal/DetailPostModal";
import { useFollowStore } from "../store/useFollowStore";

const Home = () => {
  const { getAllFollowingPosts, message, followingPosts } = usePostStore();
  const { getFollowRecommendations, recommendUsers } = useFollowStore();

  useEffect(() => {
    getAllFollowingPosts();
    getFollowRecommendations();
  }, []);

  return (
    <div className="flex">
      <div className="flex-grow">
        <DetailPostModal />
        <div className="flex justify-center">
          {!followingPosts && !recommendUsers ? (
            <div className="h-screen flex items-center justify-center">
              Loading ...
            </div>
          ) : (
            <Posts
              message={message}
              posts={getAllFollowingPosts}
              recommend={recommendUsers}
            />
          )}
        </div>
      </div>
      <div className="w-[24rem] xl:block hidden"></div>
    </div>
  );
};

export default Home;
