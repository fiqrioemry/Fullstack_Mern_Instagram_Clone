import Posts from "@/components/post/Posts";
import EndOfPost from "@/components/post/EndOfPost";
import { usePostStore } from "@/store/usePostStore";
import useScrollToView from "@/hooks/useScrollToView";
import AuthorCard from "@/components/profile/AuthorCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import NoPostToShow from "@/components/post/NoPostToShow";
import HomeLoading from "@/components/skeleton/HomeLoading";
import PostsLoading from "@/components/skeleton/PostsLoading";

const Home = () => {
  const { viewRef } = useScrollToView();
  const { getPublicPosts, posts, loading, totalPosts } = usePostStore();

  const { triggerRef } = useInfiniteScroll(getPublicPosts, totalPosts);

  if (!posts) return <HomeLoading />;

  if (posts.length === 0) return <NoPostToShow />;

  return (
    <div className="min-h-screen flex">
      {/* scroll to top ref*/}
      <div ref={viewRef} />
      {/* posts display */}
      <div className="flex px-2 md:px-10 py-[3rem] md:py-0 mb-8">
        <div className="md:w-7/12  w-full px-4 md:px-2 space-y-2">
          {posts.map((post) => (
            <Posts post={post} key={post.postId} />
          ))}

          {loading && <PostsLoading />}

          <div ref={triggerRef} className="h-12" />

          {posts.length >= totalPosts && <EndOfPost />}
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
