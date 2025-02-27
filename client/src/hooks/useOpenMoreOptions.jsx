import { useEffect, useRef, useState } from "react";

const useOpenMoreOptions = () => {
  const moreRef = useRef(null);
  const [openMore, setOpenMore] = useState(false);
  const [toggleTheme, setToggleTheme] = useState(false);

  const handleOpenMore = () => {
    setOpenMore((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setToggleTheme(false);
        setOpenMore(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return {
    moreRef,
    openMore,
    setOpenMore,
    toggleTheme,
    setToggleTheme,
    handleOpenMore,
  };
};

export default useOpenMoreOptions;
