import { useState } from "react";

const useOpenSearch = () => {
  const [open, setOpen] = useState(false);
  const handleOpenSearch = () => {
    setOpen((prev) => !prev);
  };
  return { setOpen, open, handleOpenSearch };
};

export default useOpenSearch;
