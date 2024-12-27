/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSearchPanel from "../hooks/useSearchPanel";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { searchActive, handleSearch, searchRef } = useSearchPanel();

  return (
    <GlobalContext.Provider
      value={{ currentPath, navigate, searchRef, searchActive, handleSearch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => useContext(GlobalContext);
