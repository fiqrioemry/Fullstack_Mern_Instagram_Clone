/* eslint-disable react/prop-types */
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, createContext, useContext } from "react";
import PageLoading from "@/components/skeleton/PageLoading";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user, authCheck, isAuthenticate, socket, onlineUsers } =
    useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        isAuthenticate,
      }}
    >
      <Toaster />
      {isAuthenticate === null ? <PageLoading /> : children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => useContext(GlobalContext);
