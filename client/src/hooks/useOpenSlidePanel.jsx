import { useEffect, useState, useRef } from "react";

const useOpenSlidePanel = () => {
  const panelRef = useRef(null);
  const [openPanel, setOpenPanel] = useState(null);

  const handleOpen = (panel) => {
    setOpenPanel((prevPanel) => (prevPanel === panel ? null : panel));
  };

  const handleClose = () => {
    setOpenPanel(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openPanel &&
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPanel]);

  return { handleOpen, openPanel, handleClose, panelRef };
};

export default useOpenSlidePanel;
