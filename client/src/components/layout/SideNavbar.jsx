import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import NavMenu from "@/components/sidebar/NavMenu";
import NavSearch from "@/components/sidebar/NavSearch";
import NavOptions from "@/components/sidebar/NavOptions";
import useOpenSearchBar from "@/hooks/useOpenSearchBar";

const SideNavbar = () => {
  const btnRef = useRef(null);
  const searchRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);

  const { handleOpen } = useOpenSearchBar(
    openSearch,
    setOpenSearch,
    btnRef,
    searchRef
  );

  return (
    <aside className="aside">
      <NavSearch
        ref={searchRef}
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />
      <nav
        className={cn(openSearch ? "w-20" : "w-20 lg:w-full", "side-navbar")}
      >
        <NavMenu
          ref={btnRef}
          openSearch={openSearch}
          handleSearch={handleOpen}
        />

        <NavOptions openSearch={openSearch} />
      </nav>
    </aside>
  );
};

export default SideNavbar;
