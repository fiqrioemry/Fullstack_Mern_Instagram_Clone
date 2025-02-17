/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { createContext, useContext } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import PageLoading from "../components/skeleton/PageLoading";
import { useLocation } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const location = useLocation().pathname;
  const { user, authCheck, isAuthenticate } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        isAuthenticate,
        location,
      }}
    >
      <Toaster />
      {isAuthenticate === null ? <PageLoading /> : children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => useContext(GlobalContext);
