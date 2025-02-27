import { searchState } from "@/config";
import { useFormSchema } from "./useFormSchema";
import { useUserStore } from "@/store/useUserStore";
import { useCallback, useEffect, useRef, useState } from "react";

const useHandleSearch = () => {
  const searchRef = useRef(null);
  const debounceRef = useRef(null);
  const searchForm = useFormSchema(searchState);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  const { users, searchUser, searching, searchTerm } = useUserStore();

  const searchHandler = useCallback(() => {
    if (!searchForm.values.username.trim()) return;
    searchUser(searchForm.values.username);
  }, [searchForm.values.username, searchUser]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(searchHandler, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchForm.values.username, searchHandler]);

  return { users, searching, searchTerm, searchForm, handleSearch };
};

export default useHandleSearch;
