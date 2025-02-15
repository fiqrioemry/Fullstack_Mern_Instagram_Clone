import { useEffect } from "react";

export const useInfiniteScroll = (
  loading,
  setLimit,
  postsLength,
  totalPosts
) => {
  useEffect(() => {
    console.log("jalan");
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;

      if (scrollPosition >= documentHeight - 10 && postsLength < totalPosts) {
        setLimit((prevLimit) => prevLimit + 3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, postsLength, totalPosts]);
};
