import { useEffect, useRef, useState } from "react";

const useHandleSearch = () => {
  const searchRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && openSearch) setOpenSearch(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSearch]);

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
    searchRef,
    openSearch,
    handleSearch,
  };
};

export default useHandleSearch;
