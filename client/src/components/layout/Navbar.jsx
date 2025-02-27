import { cn } from "@/lib/utils";
import { useState } from "react";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";

const Navbar = () => {
  const navigate = useNavigate();

  const [openSearch, setOpenSearcn] = useState(false);

  const handleNavigate = (user) => navigate(`/${user.username}`);

  const { users, searching, searchTerm, searchForm } = useHandleSearch();

  const searchActive = cn(openSearch ? "hidden" : "block", "duration-300 px-2");

  return (
    <nav className="navbar">
      <div className="flex items-center">
        <div className={searchActive}>
          <h3>logo</h3>
        </div>
        <div className="w-full relative">
          <SearchInput setOpenSearch={setOpenSearcn} searchForm={searchForm} />

          {searchForm?.values?.username?.length > 0 && (
            <SearchResult
              users={users}
              searching={searching}
              searchTerm={searchTerm}
              onClick={handleNavigate}
            />
          )}
        </div>
        <div className={searchActive}>
          <Settings />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
