import { Link } from "react-router-dom";
import Posts from "@/components/post/Posts";
import EndOfPost from "@/components/post/EndOfPost";
import { usePostStore } from "@/store/usePostStore";
import useScrollToView from "@/hooks/useScrollToView";
import AuthorCard from "@/components/profile/AuthorCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import NoPostToShow from "@/components/post/NoPostToShow";
import PostsLoading from "@/components/skeleton/PostsLoading";
import HomeLoading from "../components/skeleton/HomeLoading";

const Home = () => {
  const { viewRef } = useScrollToView();
  const { getPostsFromFollowings, posts, loading, totalPosts } = usePostStore();

  const { triggerRef } = useInfiniteScroll(getPostsFromFollowings, totalPosts);

  if (!posts) return <HomeLoading />;

  if (posts.length === 0) return <NoPostToShow />;

  return (
    <div className="min-h-screen flex">
      {/* scroll to top ref*/}
      <div ref={viewRef} />
      {/* posts display */}
      <div className="flex px-2 md:px-10 py-[3rem] md:py-0 mb-8">
        <div className="md:w-7/12 px-4 md:px-2 space-y-2">
          {posts.map((post) => (
            <Posts post={post} key={post.postId} />
          ))}

          {loading && <PostsLoading />}

          <div ref={triggerRef} className="h-12" />

          {posts.length >= totalPosts && (
            <>
              <EndOfPost />
              <Link to="/explore" className="btn btn-secondary">
                Follow User For More
              </Link>
            </>
          )}
        </div>

        {/* author card */}
        <div className="w-5/12 hidden md:block">
          <div className="flex justify-center py-4">
            <AuthorCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
