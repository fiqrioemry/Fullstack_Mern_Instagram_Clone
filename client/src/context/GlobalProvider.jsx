/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useHandleModal from "../hooks/useHandleModal";

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

  return (
    <GlobalContext.Provider
      value={{
        currentPath,
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
