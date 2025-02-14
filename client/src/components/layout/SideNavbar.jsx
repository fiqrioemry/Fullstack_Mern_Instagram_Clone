import { cn } from "@/lib/utils";
import NavMenu from "@/components/sidebar/NavMenu";
import SearchBar from "@/components/sidebar/SearchBar";
import { useProvider } from "@/context/GlobalProvider";
import MenuOptions from "@/components/sidebar/MenuOptions";

const SideNavbar = () => {
  const { openSearch, searchRef } = useProvider();

  return (
    <aside className="hidden bg-red-500 md:relative bottom-0 right-0 left-0 max-w-[245px] z-10">
      <SearchBar openSearch={openSearch} searchRef={searchRef} />
      <div className={cn(openSearch ? "w-[75px]" : "w-full", "searchpanel")}>
        <div className="px-3">
          <div className="md:flex justify-center hidden h-[6.5rem]">
            <h3>Momengram</h3>
          </div>

          <div>
            <NavMenu />
          </div>

          <div>
            <MenuOptions openSearch={openSearch} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNavbar;
