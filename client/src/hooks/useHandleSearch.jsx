import { searchState } from "@/config";
import { useFormSchema } from "./useFormSchema";
import { useUserStore } from "@/store/useUserStore";
import { useCallback, useEffect, useRef } from "react";

const useHandleSearch = () => {
  const debounceRef = useRef(null);

  const searchForm = useFormSchema(searchState);

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

  return { users, searching, searchTerm, searchForm };
};

export default useHandleSearch;
