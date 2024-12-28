import SidebarContent from "../sidebar/SidebarContent";
import SidebarSearchPanel from "../sidebar/SidebarSearchPanel";
import useHandleSearch from "../../hooks/useHandleSearch";

const Sidebar = () => {
  const { openSearch, handleSearch, searchRef, buttonRef } = useHandleSearch();

  return (
    <aside className="sidebar_wrapper">
      <SidebarSearchPanel openSearch={openSearch} searchRef={searchRef} />

      <div
        className={` ${
          openSearch ? "w-[75px]" : "w-full"
        } sidebar_content_wrapper `}
      >
        <SidebarContent
          openSearch={openSearch}
          handleSearch={handleSearch}
          buttonRef={buttonRef}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
