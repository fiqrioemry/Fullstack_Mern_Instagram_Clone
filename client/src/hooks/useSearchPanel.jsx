import { useEffect, useRef, useState } from "react";

const useSearchPanel = () => {
  const searchRef = useRef(null);
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = () => {
    setSearchActive((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && searchActive) setSearchActive(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [searchActive]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        handleSearch();
      }

      if (!searchRef || !searchRef.current) return;
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  return {
    searchActive,
    handleSearch,
    searchRef,
  };
};

export default useSearchPanel;
