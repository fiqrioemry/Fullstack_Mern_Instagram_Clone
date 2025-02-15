import NotFound from "./NotFound";
import Posts from "@/components/post/Posts";
import { usePostStore } from "@/store/usePostStore";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import PostsLoading from "@/components/skeleton/PostsLoading";

const Home = () => {
  const { getPublicPosts, posts, loading, totalPosts } = usePostStore();
  const { triggerRef } = useInfiniteScroll({
    initialLimit: 3,
    increment: 3,
    totalItems: totalPosts,
    fetchData: getPublicPosts,
    currentItems: posts.length,
  });

  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem] px-2">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 py-6">
              {loading && posts.length === 0 ? (
                <PostsLoading />
              ) : (
                <div className="space-y-6">
                  {posts.length > 0 ? (
                    posts.map((post) => <Posts post={post} key={post.postId} />)
                  ) : (
                    <NotFound />
                  )}
                  {loading && <PostsLoading />}
                  <div ref={triggerRef} className="h-10"></div>
                  {posts.length >= totalPosts && (
                    <div className="text-center text-gray-500 mt-4">
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
      <div className="w-[26rem] xl:block hidden"></div>
    </div>
  );
};

export default Home;
