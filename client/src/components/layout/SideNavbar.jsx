import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import NavMenu from "@/components/sidebar/NavMenu";
import NavSearch from "@/components/sidebar/NavSearch";
import NavOptions from "@/components/sidebar/NavOptions";
import useOpenSearchBar from "@/hooks/useOpenSearchBar";
import { useLocation } from "react-router-dom";

const SideNavbar = () => {
  const btnRef = useRef(null);
  const location = useLocation();
  const searchRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);

  const { handleOpen } = useOpenSearchBar(
    openSearch,
    setOpenSearch,
    btnRef,
    searchRef
  );

  return (
    <aside
      className={cn(
        location.pathname.includes("message") ? "w-20" : "w-20 lg:w-72",
        "aside duration-300"
      )}
    >
      <NavSearch
        ref={searchRef}
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />
      <nav
        className={cn(
          openSearch || location.pathname.includes("message")
            ? "w-20"
            : "w-20 lg:w-full",
          "side-navbar"
        )}
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
