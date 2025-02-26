import { Link } from "react-router-dom";
import Posts from "@/components/post/Posts";
import EndOfPost from "@/components/post/EndOfPost";
import { usePostStore } from "@/store/usePostStore";
import useScrollToView from "@/hooks/useScrollToView";
import AuthorCard from "@/components/profile/AuthorCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import NoPostToShow from "@/components/post/NoPostToShow";
import PostsLoading from "@/components/skeleton/PostsLoading";

const Home = () => {
  const { viewRef } = useScrollToView();
  const { getPostsFromFollowings, posts, loading, totalPosts } = usePostStore();
  const { triggerRef } = useInfiniteScroll(
    getPostsFromFollowings,
    totalPosts,
    posts.length
  );

  return (
    <div className="flex">
      <div ref={viewRef} />
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem] px-2">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 py-6">
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

                  <div ref={triggerRef} className="h-12" />

                  {posts.length >= totalPosts && posts.length > 0 && (
                    <>
                      <EndOfPost />
                      <Link to="/" className="btn btn-secondary">
                        Follow User For More
                      </Link>
                    </>
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
