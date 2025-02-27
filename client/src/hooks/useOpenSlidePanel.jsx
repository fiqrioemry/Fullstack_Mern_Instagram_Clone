import { useEffect, useState, useRef } from "react";

const useOpenSlidePanel = () => {
  const [openPanel, setOpenPanel] = useState(null);
  const panelRef = useRef(null); // Menyimpan referensi ke panel aktif

  const handleOpen = (panel) => {
    console.log(panel);
    console.log(openPanel);
    console.log(openPanel === panel);
    setOpenPanel(openPanel === panel ? null : panel);
  };

  const handleClose = () => {
    setOpenPanel(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        handleClose(); // Tutup panel
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
