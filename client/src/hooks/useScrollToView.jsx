import { useEffect, useRef } from "react";

const useScrollToView = (state) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [state]);

  return { ref };
};

export default useScrollToView;
