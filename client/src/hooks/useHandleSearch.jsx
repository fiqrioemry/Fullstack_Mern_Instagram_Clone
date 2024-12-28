import { useEffect, useRef, useState } from "react";

const useHandleSearch = () => {
  const searchRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setOpenSearch(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && openSearch) setOpenSearch(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSearch]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Bersihkan event listener saat komponen dilepas
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    searchRef,
    openSearch,
    handleSearch,
    handleClickOutside,
  };
};

export default useHandleSearch;
