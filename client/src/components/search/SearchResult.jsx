/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import Avatar from "@/components/ui/Avatar";
import SearchLoading from "@/components/skeleton/SearchLoading";

const SearchResult = ({ users, searching, searchTerm, onClick }) => {
  const memoizedUsers = useMemo(() => {
    if (searching) return <SearchLoading />;

    if (users.length === 0 && searchTerm)
      return <p className="text-muted-foreground mt-4">No Users Found</p>;

    return users.map((user) => (
      <button
        onClick={() => onClick(user)}
        className="btn-selection mt-2"
        key={user.userId}
      >
        <Avatar avatar={user.avatar} />
        <div className="flex flex-col items-start text-xs md:text-sm">
          <div> {user.username}</div>
          <p>{user.fullname}</p>
        </div>
      </button>
    ));
  }, [users, searching, searchTerm]);

  return <>{memoizedUsers}</>;
};

export default SearchResult;
