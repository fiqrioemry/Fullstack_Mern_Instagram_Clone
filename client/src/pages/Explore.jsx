import Posts from "@/components/post/Posts";
import EndOfPost from "@/components/post/EndOfPost";
import { usePostStore } from "@/store/usePostStore";
import useScrollToView from "@/hooks/useScrollToView";
import AuthorCard from "@/components/profile/AuthorCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import PostsLoading from "@/components/skeleton/PostsLoading";

const Explore = () => {
  const { viewRef } = useScrollToView();
  const { getPublicPosts, posts, loading, totalPosts } = usePostStore();
  const { triggerRef } = useInfiniteScroll(
    getPublicPosts,
    totalPosts,
    posts.length
  );

  return (
    <div className="flex">
      <div ref={viewRef} />
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem] p-2">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 py-6">
              {posts.length === 0 ? (
                <PostsLoading />
              ) : (
                <div className="space-y-6">
                  <div>
                    {posts.map((post) => (
                      <Posts post={post} key={post.postId} />
                    ))}
                  </div>
                  {loading && posts.length > 0 && <PostsLoading />}

                  <div ref={triggerRef} className="h-12" />

                  {posts.length >= totalPosts && <EndOfPost />}
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

export default Explore;
