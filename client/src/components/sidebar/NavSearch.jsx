/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";

const NavSearch = forwardRef(({ openSearch }, ref) => {
  const navigate = useNavigate();

  const { users, searchTerm, searching, searchUser } = useUserStore();

  const { searchForm } = useHandleSearch(searchUser);

  const handleNavigate = (user) => {
    searchForm.resetForm();
    navigate(`/${user.username}`);
  };

  return (
    <div
      ref={ref}
      className={cn(openSearch ? "left-20" : "-left-96", "nav-search")}
    >
      <div className="mt-4 space-y-4">
        <h3>Search result</h3>
        <SearchInput searchForm={searchForm} />
        {searchForm?.values?.username?.length > 0 && (
          <SearchResult
            users={users}
            searching={searching}
            onClick={handleNavigate}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
});

export default NavSearch;
