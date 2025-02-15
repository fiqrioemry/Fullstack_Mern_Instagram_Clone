import { useEffect } from "react";

export const useInfiniteScroll = (loading, setLimit) => {
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;

      if (scrollPosition >= documentHeight - 10) {
        setLimit((prevLimit) => prevLimit + 3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);
};
