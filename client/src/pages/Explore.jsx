import { usePostStore } from "@/store/usePostStore";
import useScrollToView from "@/hooks/useScrollToView";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import EndOfPost from "@/components/home-explore/EndOfPost";
import HomeLoading from "@/components/skeleton/HomeLoading";
import PostsLoading from "@/components/skeleton/PostsLoading";
import AuthorCard from "@/components/home-explore/AuthorCard";
import NoPostToShow from "@/components/home-explore/NoPostToShow";
import PostsLayout from "../components/home-explore/PostsLayout";

const Explore = () => {
  const { viewRef } = useScrollToView();
  const { getPublicPosts, posts, loading, totalPosts } = usePostStore();

  const { triggerRef } = useInfiniteScroll(getPublicPosts, totalPosts);

  if (!posts) return <HomeLoading />;

  if (posts.length === 0) return <NoPostToShow />;

  return (
    <div className="flex mx-2 md:mx-12">
      {/* scroll to top ref*/}
      <div ref={viewRef} />
      {/* posts display */}
      <div className="flex-1">
        {posts.map((post) => (
          <PostsLayout post={post} key={post.postId} />
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
  );
};

export default Explore;
