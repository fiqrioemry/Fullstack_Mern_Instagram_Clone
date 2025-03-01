/* eslint-disable react/prop-types */
import Avatar from "@/components/ui/Avatar";
import SearchLoading from "@/components/skeleton/SearchLoading";

const Results = ({ users, searching, onClick }) => {
  if (searching) return <SearchLoading />;

  if (users.length === 0)
    return <p className="text-muted-foreground mt-4">No Users Found</p>;

  return users.map((user) => (
    <button
      onClick={() => onClick(user)}
      className="btn-search mt-2"
      key={user.userId}
    >
      <Avatar avatar={user.avatar} />
      <div className="flex flex-col items-start text-xs md:text-sm">
        <div> {user.username}</div>
        <p>{user.fullname}</p>
      </div>
    </button>
  ));
};

export default Results;
