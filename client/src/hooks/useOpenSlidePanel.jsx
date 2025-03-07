import { useEffect, useRef, useState } from "react";

const useOpenSlidePanel = () => {
  const panelRef = useRef(null);

  const [openPanel, setOpenPanel] = useState(false);

  const handleOpenPanel = () => {
    setOpenPanel(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpenPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPanel]);

  return { handleOpenPanel, openPanel, panelRef };
};

export default useOpenSlidePanel;
