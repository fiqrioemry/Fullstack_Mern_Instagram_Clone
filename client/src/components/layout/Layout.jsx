import Navbar from "./Navbar";
import { Fragment } from "react";
import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = () => {
  return (
    <Fragment className="h-screen">
      <Navbar />

      <ScrollArea className="flex overflow-y-auto ">
        <SideNavbar />
        <div className="flex-1">
          <Outlet />
        </div>
      </ScrollArea>
      <BottomNavbar />
    </Fragment>
  );
};

export default Layout;
