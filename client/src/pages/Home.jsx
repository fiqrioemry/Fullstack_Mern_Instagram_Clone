import Posts from "../components/post/Posts";
import DetailPostModal from "../components/modal/DetailPostModal";
import { usePostStore } from "../store/usePostStore";
import { useEffect } from "react";

const Home = () => {
  const { getAllFollowingPosts, message, followingPosts } = usePostStore();

  useEffect(() => {
    getAllFollowingPosts();
  }, []);

  return (
    <div className="flex">
      <div className="flex-grow">
        <DetailPostModal />
        <div className="flex justify-center">
          {!followingPosts ? (
            <div className="h-screen flex items-center justify-center">
              Loading ...
            </div>
          ) : (
            <Posts message={message} data={getAllFollowingPosts} />
          )}
        </div>
      </div>
      <div className="w-[24rem] xl:block hidden"></div>
    </div>
  );
};

export default Home;
