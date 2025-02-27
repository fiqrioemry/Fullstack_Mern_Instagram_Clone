import Navbar from "./Navbar";
import { Fragment } from "react";
// import Sidebar from "./Sidebar";
import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="flex h-auto md:h-screen ">
        <SideNavbar />
        {/* <Sidebar /> */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <BottomNavbar />
      </main>
    </Fragment>
  );
};

export default Layout;
