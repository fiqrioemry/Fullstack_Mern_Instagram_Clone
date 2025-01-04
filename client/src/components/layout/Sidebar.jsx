import NavLinks from "../NavLinks";
import ProfileLink from "../ProfileLink";

import InstagramIcon from "../common/InstagramIcon";
import InstagramLogo from "../common/InstagramLogo";
import { useProvider } from "../../context/GlobalProvider";
import SidebarSearchPanel from "../sidebar/SidebarSearchPanel";

const Sidebar = () => {
  const { openSearch, searchRef } = useProvider();

  return (
    <aside className="sidebar_wrapper">
      <SidebarSearchPanel openSearch={openSearch} searchRef={searchRef} />

      <div
        className={` ${
          openSearch ? "w-[75px]" : "w-full"
        } sidebar_content_wrapper `}
      >
        <div className="px-3">
          <div className="hidden md:flex items-center h-[6.5rem] px-3">
            {openSearch ? (
              <InstagramIcon />
            ) : (
              <InstagramLogo size={30} width={105} />
            )}
          </div>

          <div className="flex md:block">
            <NavLinks />
            <ProfileLink />
          </div>
          <div className="hidden md:block"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
