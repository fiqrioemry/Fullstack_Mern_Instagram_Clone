import { useEffect } from "react";

const useOpenSearchBar = (openState, setOpenState, firstRef, secondRef) => {
  const handleOpen = () => {
    setOpenState((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        firstRef.current &&
        !firstRef.current.contains(event.target) &&
        secondRef.current &&
        !secondRef.current.contains(event.target)
      ) {
        setOpenState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openState]);

  return { handleOpen };
};

export default useOpenSearchBar;
