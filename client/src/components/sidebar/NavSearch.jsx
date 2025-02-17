/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

const NavSearch = forwardRef(({ openSearch }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(openSearch ? "left-20" : "-left-96", "nav-search")}
    >
      <div className="px-4 py-6">
        <h3>Search panel</h3>
        <form className="mt-5">
          <Input />
        </form>
      </div>
    </div>
  );
});

export default NavSearch;
