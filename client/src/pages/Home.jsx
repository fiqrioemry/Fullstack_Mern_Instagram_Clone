import { usePostStore } from "@/store/usePostStore";
import useScrollToView from "@/hooks/useScrollToView";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import HomeLoading from "@/components/skeleton/HomeLoading";
import PostsLoading from "@/components/skeleton/PostsLoading";
import AuthorCard from "@/components/home-explore/AuthorCard";
import NoPostToShow from "@/components/home-explore/NoPostToShow";
import PostsDisplay from "@/components/home-explore/PostsDisplay";
import NoMorePosts from "../components/home-explore/NoMorePosts";

const Home = () => {
  const { viewRef } = useScrollToView();

  const { getPostsFromFollowings, posts, loading, totalPosts } = usePostStore();

  const { triggerRef } = useInfiniteScroll(getPostsFromFollowings, totalPosts);

  if (!posts) return <HomeLoading />;

  if (posts.length === 0) return <NoPostToShow />;

  return (
    <div className="flex mx-2 md:mx-8 space-y-2">
      {/* posts display */}
      <div className="flex-1 ">
        <div ref={viewRef} />
        {posts.map((post) => (
          <PostsDisplay post={post} key={post.postId} />
        ))}
        {loading && <PostsLoading />}
        <div ref={triggerRef} className="h-12" />
        {posts.length >= totalPosts && <NoMorePosts />}
      </div>

      {/* author card */}
      <div className="w-5/12 hidden md:block">
        <div className="flex justify-center py-4">
          <AuthorCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
