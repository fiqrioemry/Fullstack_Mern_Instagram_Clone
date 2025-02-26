import { useEffect, useState, useRef } from "react";

const useInfiniteScroll = (fetchData, totalItems, currentItems) => {
  const observer = useRef(null);
  const triggerRef = useRef(null);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    fetchData(limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && currentItems < totalItems) {
        setLimit((prevLimit) => prevLimit + 3);
      }
    });

    if (triggerRef.current) {
      observer.current.observe(triggerRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [currentItems, totalItems]);

  return { limit, triggerRef };
};

export default useInfiniteScroll;
