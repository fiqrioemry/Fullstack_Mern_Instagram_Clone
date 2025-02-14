/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { createContext, useContext } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import useHandleSearch from "@/hooks/useHandleSearch";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user, authCheck, isAuthenticate } = useAuthStore();
  const { handleSearch, openSearch, searchRef } = useHandleSearch();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        openSearch,
        searchRef,
        handleSearch,
        isAuthenticate,
      }}
    >
      <Toaster />
      {isAuthenticate === null ? null : children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => useContext(GlobalContext);
