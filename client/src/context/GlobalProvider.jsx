/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useHandleModal from "../hooks/useHandleModal";
import { useLocation, useNavigate } from "react-router-dom";
import useHandleDarkMode from "../hooks/useHandleDarkMode";
import useHandleSearch from "../hooks/useHandleSearch";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useHandleSearch();
  useHandleDarkMode();
  const {
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
    handleCloseAllModals,
  } = useHandleModal();

  return (
    <GlobalContext.Provider
      value={{
        navigate,
        currentPath,
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
