import Posts from "@/components/post/Posts";
import { usePostStore } from "@/store/usePostStore";
import AuthorCard from "@/components/profile/AuthorCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import PostsLoading from "@/components/skeleton/PostsLoading";
import useScrollToView from "../hooks/useScrollToView";

const Explore = () => {
  const { getPublicPosts, posts, loading, totalPosts } = usePostStore();
  const { triggerRef } = useInfiniteScroll(
    totalPosts,
    getPublicPosts,
    posts.length
  );

  const { viewRef } = useScrollToView();
  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem] p-2">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 py-6">
              <div ref={viewRef}></div>
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
                  <div ref={triggerRef} className="h-10"></div>
                  {posts.length >= totalPosts && (
                    <div className="text-center text-muted-foreground">
                      <p>You have reached the end</p>
                      <p>No more post to show</p>
                    </div>
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

export default Explore;
