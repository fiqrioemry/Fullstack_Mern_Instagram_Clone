import SidebarContent from "../sidebar/SidebarContent";
import SidebarSearchPanel from "../sidebar/SidebarSearchPanel";
import useHandleSearch from "../../hooks/useHandleSearch";

const Sidebar = () => {
  const { openSearch, handleSearch } = useHandleSearch();

  return (
    <aside className="sidebar_wrapper">
      <SidebarSearchPanel openSearch={openSearch} />
      
      <div
        className={` ${
          openSearch ? "w-[75px]" : "w-full"
        } sidebar_content_wrapper `}
      >
        <SidebarContent openSearch={openSearch} handleSearch={handleSearch} />
      </div>
    </aside>
  );
};

export default Sidebar;
