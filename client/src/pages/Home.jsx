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
    <div className="flex mx-2 md:mx-12">
      {/* scroll to top ref*/}
      <div ref={viewRef} />
      {/* posts display */}
      <div className="flex-1">
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
  );
};

export default Home;
