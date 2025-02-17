/* eslint-disable react/display-name */
import { cn } from "@/lib/utils";
import { searchState } from "@/config";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import SearchLoading from "@/components/skeleton/SearchLoading";
import { forwardRef, useEffect, useMemo, useCallback, useRef } from "react";

const NavSearch = forwardRef(({ openSearch }, ref) => {
  const debounceRef = useRef(null);
  const searchForm = useFormSchema(searchState);
  const { users, searchUser, searching, searchTerm } = useUserStore();

  const searchHandler = useCallback(() => {
    if (!searchForm.values.username.trim()) return;
    searchUser(searchForm.values.username);
  }, [searchForm.values.username, searchUser]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(searchHandler, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchForm.values.username, searchHandler]);

  const userResults = useMemo(() => {
    if (searching) return <SearchLoading />;
    if (users.length === 0 && searchTerm)
      return <p className="text-muted-foreground mt-4">No Users Found</p>;

    return users.map((user) => (
      <div className="flex items-center gap-4" key={user.id || user.username}>
        <Avatar avatar={user.avatar} />
        <div>
          <Link to={`/${user.username}`} className="btn-secondary">
            {user.username}
          </Link>
          <p className="text-xs md:text-sm text-muted-foreground">
            {user.fullname}
          </p>
        </div>
      </div>
    ));
  }, [users, searching, searchTerm]);

  return (
    <div
      ref={ref}
      className={cn(openSearch ? "left-20" : "-left-96", "nav-search")}
    >
      <div className="px-4 py-6">
        <h3>Search Users</h3>
        <form className="mt-3">
          <Input
            name="username"
            placeholder="Search by username..."
            value={searchForm.values.username}
            onChange={searchForm.handleChange}
            className="w-full border-muted-foreground/20"
          />
        </form>
        {searchForm.values.username &&
          searchForm.values.username.length > 0 && (
            <div className="mt-4 space-y-2 p-2">{userResults}</div>
          )}
      </div>
    </div>
  );
});

export default NavSearch;
