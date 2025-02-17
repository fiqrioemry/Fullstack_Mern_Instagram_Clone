import { cn } from "@/lib/utils";
import NavMenu from "@/components/sidebar/NavMenu";
import { useEffect, useRef, useState } from "react";
import NavSearch from "@/components/sidebar/NavSearch";
import NavOptions from "@/components/sidebar/NavOptions";

const SideNavbar = () => {
  const btnRef = useRef(null);
  const searchRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        btnRef.current &&
        !btnRef.current.contains(event.target)
      ) {
        setOpenSearch(false);
      }
    };

    if (openSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  return (
    <aside className="aside">
      <NavSearch openSearch={openSearch} ref={searchRef} />
      <nav className={cn(openSearch ? "w-20" : "w-full", "side-navbar")}>
        <NavMenu
          ref={btnRef}
          openSearch={openSearch}
          handleSearch={handleSearch}
        />
        <NavOptions openSearch={openSearch} />
      </nav>
    </aside>
  );
};

export default SideNavbar;
