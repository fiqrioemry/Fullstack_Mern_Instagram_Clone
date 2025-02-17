/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { forwardRef, useEffect } from "react";
import { useFormSchema } from "../../hooks/useFormSchema";
import { useUserStore } from "../../store/useUserStore";
import Avatar from "../ui/Avatar";

const searchState = {
  username: "",
};

const NavSearch = forwardRef(({ openSearch }, ref) => {
  const { users, searchUser, searching } = useUserStore();
  const searchForm = useFormSchema(searchState);

  useEffect(() => {
    if (!searchForm.values.username.trim()) return;

    const delayDebounce = setTimeout(() => {
      searchUser(searchForm.values.username);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchForm.values.username, searchUser]);

  return (
    <div
      ref={ref}
      className={cn(openSearch ? "left-20" : "-left-96", "nav-search")}
    >
      <div className="px-4 py-6">
        <h3 className="text-lg font-semibold">Search Users</h3>
        <form className="mt-3">
          <Input
            name="username"
            placeholder="Search by username..."
            value={searchForm.values.username}
            onChange={searchForm.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </form>

        {users.length > 0 && (
          <div className="mt-4 space-y-2 p-2">
            {users.map((user) => (
              <button
                key={user.id}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100"
              >
                <Avatar avatar={user.avatar} className="w-10 h-10 mr-3" />
                <div className="text-left">
                  <h4 className="font-semibold">{user.username}</h4>
                  <span className="text-sm text-gray-500">{user.fullname}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {users.length === 0 && searchForm.values.username && (
          <p className="mt-4 text-sm text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
});

export default NavSearch;
