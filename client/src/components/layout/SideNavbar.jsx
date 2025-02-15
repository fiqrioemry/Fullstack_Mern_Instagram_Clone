import { cn } from "@/lib/utils";
import Searchbar from "../sidebar/SearchBar";
import NavMenu from "@/components/sidebar/NavMenu";
import { useProvider } from "@/context/GlobalProvider";
import MenuOptions from "@/components/sidebar/MenuOptions";
import { Instagram } from "lucide-react";

const SideNavbar = () => {
  const { openSearch, searchRef } = useProvider();

  return (
    <aside className="w-72 md:relative md:block hidden">
      <Searchbar openSearch={openSearch} searchRef={searchRef} />
      <div
        className={cn(
          openSearch ? "w-20" : "w-full",
          "absolute top-0 left-0 bottom-0 border-r duration-300 transition-all ease-in z-30"
        )}
      >
        <div className="space-y-4 p-2">
          <div className="h-24 flex items-center">
            <div
              className={cn(
                openSearch ? "opacity-100" : "opacity-0",
                " duration-300 transition-all ease-in w-24 flex justify-center"
              )}
            >
              <Instagram />
            </div>
            <h3
              className={cn(
                openSearch ? "opacity-0" : "opacity-100",
                " duration-300 transition-all ease-in"
              )}
            >
              Momengram
            </h3>
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
