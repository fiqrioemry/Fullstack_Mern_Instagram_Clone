import { useEffect, useRef } from "react";

const useScrollToView = (state) => {
  const viewRef = useRef(null);

  useEffect(() => {
    viewRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state]);

  return { viewRef };
};

export default useScrollToView;
