import WebLogo from "../WebLogo";
import { cn } from "@/lib/utils";
import NavLinks from "../NavLinks";
import SearchBar from "../sidebar/SearchBar";
import { useProvider } from "../../context/GlobalProvider";
import MenuOptions from "../sidebar/MenuOptions";

const Sidebar = () => {
  const { openSearch, searchRef } = useProvider();

  return (
    <aside className="sidebar bg-red-500">
      <SearchBar openSearch={openSearch} searchRef={searchRef} />
      <div className={cn(openSearch ? "w-[75px]" : "w-full", "searchpanel")}>
        <div className="px-3">
          <div className="md:flex justify-center hidden h-[6.5rem]">
            <WebLogo openSearch={openSearch} />
          </div>

          <NavLinks />

          <div className="hidden md:block">
            <MenuOptions openSearch={openSearch} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
