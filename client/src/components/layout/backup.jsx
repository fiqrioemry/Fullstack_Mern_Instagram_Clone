import Navbar from "./Navbar";
import { Fragment } from "react";
import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="flex">
        <SideNavbar />
        <ScrollArea className="flex-1 h-screen overflow-y-auto ">
          <div className="flex justify-center h-screen mt-20 mb-20 md:mt-0 md:mb-0">
            <Outlet />
          </div>
        </ScrollArea>
        <BottomNavbar />
      </main>
    </Fragment>
  );
};

export default Layout;
