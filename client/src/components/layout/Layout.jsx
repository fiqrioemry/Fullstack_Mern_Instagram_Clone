import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import CreatePostModal from "../modal/CreatePostModal";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="flex h-auto md:h-screen ">
        <Toaster />
        <Sidebar />
        <CreatePostModal />

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </Fragment>
  );
};

export default Layout;
