import { useEffect, useRef, useState } from "react";

const useOpenSearchPanel = () => {
  const panelRef = useRef(null);
  const [openPanel, setOpenPanel] = useState(false);

  const handleOpenPanel = () => {
    setOpenPanel((prev) => !prev);
  };

  const handleClosePanel = () => {
    setOpenPanel(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openPanel.current && !openPanel.current.contains(event.target)) {
        handleClosePanel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPanel]);

  return { handleOpenPanel, panelRef, openPanel };
};

export default useOpenSearchPanel;
