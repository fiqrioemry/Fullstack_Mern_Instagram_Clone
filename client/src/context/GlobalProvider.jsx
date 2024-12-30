/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useContext } from "react";
import useHandleModal from "../hooks/useHandleModal";
import { useAuthStore } from "../store/useAuthStore";
import useHandleSearch from "../hooks/useHandleSearch";
import useHandleDarkMode from "../hooks/useHandleDarkMode";
import { useLocation, useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { isUserAuth, userData, userAuthCheck } = useAuthStore();

  useHandleSearch();
  useHandleDarkMode();
  const {
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
    handleCloseAllModals,
  } = useHandleModal();

  useEffect(() => {
    userAuthCheck();
  }, [userAuthCheck]);

  return (
    <GlobalContext.Provider
      value={{
        navigate,
        currentPath,
        openModal,
        isUserAuth,
        userData,
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
