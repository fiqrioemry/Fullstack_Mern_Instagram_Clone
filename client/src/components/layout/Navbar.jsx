import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";

const Navbar = () => {
  const navigate = useNavigate();

  const { users, searching, searchUser } = useUserStore();

  const { searchForm, searchRef, openSearch, handleSearch } =
    useHandleSearch(searchUser);

  const handleNavigate = (user) => {
    searchForm.resetForm();
    handleSearch();
    navigate(`/${user.username}`);
  };

  const searchActive = cn(
    openSearch ? "w-0" : "w-14",
    "overflow-hidden  delay-50 duration-300 ease-in-out transition-all "
  );

  const inputActive = cn(openSearch ? "w-full" : "w-96", "duration-300 px-2");

  return (
    <nav className="navbar">
      <div className="flex items-center">
        <div className={searchActive}>
          <div className="flex justify-center">
            <h3>logo</h3>
          </div>
        </div>
        <div ref={searchRef} className={inputActive}>
          <SearchInput handleSearch={handleSearch} searchForm={searchForm} />

          {searchForm?.values?.username?.length > 0 && (
            <SearchResult
              users={users}
              searching={searching}
              onClick={handleNavigate}
              searchTerm={searchForm.values.username}
            />
          )}
        </div>
        <div className={searchActive}>
          <div className="flex justify-center">
            <Settings />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
