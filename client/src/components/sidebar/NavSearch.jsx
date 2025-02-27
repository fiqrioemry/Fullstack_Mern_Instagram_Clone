/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";

const NavSearch = forwardRef(({ openSearch }, ref) => {
  const navigate = useNavigate();

  const handleNavigate = (user) => navigate(`/${user.username}`);

  const { users, searching, searchTerm, searchForm } = useHandleSearch();

  return (
    <div
      ref={ref}
      className={cn(openSearch ? "left-20" : "-left-96", "nav-search")}
    >
      <SearchInput searchForm={searchForm} />
      {searchForm?.values?.username?.length > 0 && (
        <SearchResult
          users={users}
          searching={searching}
          searchTerm={searchTerm}
          onClick={handleNavigate}
        />
      )}
    </div>
  );
});

export default NavSearch;
