/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useHandleModal from "../hooks/useHandleModal";
import { useLocation, useNavigate } from "react-router-dom";
import useHandleDarkMode from "../hooks/useHandleDarkMode";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const {
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
    handleCloseAllModals,
  } = useHandleModal();

  const { handleDarkMode, darkMode } = useHandleDarkMode();

  return (
    <GlobalContext.Provider
      value={{
        currentPath,
        darkMode,
        handleDarkMode,
        navigate,
        openModal,
        setOpenModal,
        handleOpenModal,
        handleCloseModal,
        handleCloseAllModals,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => useContext(GlobalContext);
