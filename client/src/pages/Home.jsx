import { Link } from "react-router-dom";
import Posts from "@/components/post/Posts";
import { usePostStore } from "@/store/usePostStore";
import AuthorCard from "@/components/profile/AuthorCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import NoPostToShow from "@/components/post/NoPostToShow";
import PostsLoading from "@/components/skeleton/PostsLoading";

const Home = () => {
  const { getPostsFromFollowings, posts, loading, totalPosts } = usePostStore();
  const { triggerRef } = useInfiniteScroll({
    initialLimit: 3,
    increment: 3,
    fetchData: getPostsFromFollowings,
    totalItems: totalPosts,
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
                    <NoPostToShow />
                  )}
                  {loading && <PostsLoading />}
                  <div ref={triggerRef} className="h-10"></div>
                  {posts.length >= totalPosts && posts.length > 0 && (
                    <div>
                      <div className="text-center text-gray-500 mt-4">
                        <p>You have reached the end</p>
                        <p>No more post to show</p>
                      </div>

                      <Link to="/explore" className="btn btn-secondary">
                        Discover People to Follow
                      </Link>
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

export default Home;
