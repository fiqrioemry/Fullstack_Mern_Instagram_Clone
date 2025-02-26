import Posts from "@/components/post/Posts";
import { usePostStore } from "@/store/usePostStore";
import useScrollToView from "@/hooks/useScrollToView";
import AuthorCard from "@/components/profile/AuthorCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import NoPostToShow from "@/components/post/NoPostToShow";
import PostsLoading from "@/components/skeleton/PostsLoading";
import LastPostNotifcation from "@/components/post/LastPostNotifcation";

const Home = () => {
  const { getPostsFromFollowings, posts, loading, totalPosts } = usePostStore();
  const { scrollRef } = useScrollToView();
  const { triggerRef } = useInfiniteScroll(
    totalPosts,
    getPostsFromFollowings,
    posts.length
  );

  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem] px-2">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 py-6">
              <div ref={scrollRef}></div>
              {loading && posts.length === 0 ? (
                <PostsLoading />
              ) : (
                <div className="space-y-6">
                  {posts.length === 0 ? (
                    <NoPostToShow />
                  ) : (
                    posts.map((post) => <Posts post={post} key={post.postId} />)
                  )}
                  {loading && posts.length > 0 && <PostsLoading />}
                  <div ref={triggerRef} className="h-10"></div>
                  {posts.length >= totalPosts && posts.length > 0 && (
                    <LastPostNotifcation />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AuthorCard />
    </div>
  );
};

export default Home;
