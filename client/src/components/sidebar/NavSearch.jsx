/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";
import useHandleSearch from "@/hooks/useHandleSearch";

const NavSearch = forwardRef(({ openSearch }, ref) => {
  const navigate = useNavigate();
  const handleNavigate = (username) => {
    navigate(`/p/${username}`);
  };
  const { users, searching, searchTerm, searchForm } = useHandleSearch();

  return (
    <div
      ref={ref}
      className={cn(openSearch ? "left-20" : "-left-96", "nav-search px-4")}
    >
      <SearchInput searchForm={searchForm} />
      {searchForm?.values?.username?.length > 0 && (
        <SearchResult
          users={users}
          searchTerm={searchTerm}
          onClick={handleNavigate}
          searching={searching}
        />
      )}
    </div>
  );
});

export default NavSearch;
