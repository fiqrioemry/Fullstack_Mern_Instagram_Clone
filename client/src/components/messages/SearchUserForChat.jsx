import { useMemo } from "react";
import { X } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import useHandleSearch from "@/hooks/useHandleSearch";
import SearchLoading from "@/components/skeleton/SearchLoading";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

// eslint-disable-next-line react/prop-types
const SearchUserForChat = ({ open, setOpen }) => {
  const { setSelectedUser } = useChatStore();
  const { users, searching, searchTerm, searchForm } = useHandleSearch();

  const handleNewChat = (user) => {
    setSelectedUser(user);
    setOpen(false);
  };

  const userResults = useMemo(() => {
    if (searching) return <SearchLoading />;

    if (users.length === 0 && searchTerm)
      return <p className="text-muted-foreground mt-4">No Users Found</p>;

    return users.map((user) => (
      <button
        onClick={() => handleNewChat(user)}
        className="btn-selection"
        key={user.userId}
      >
        <Avatar avatar={user.avatar} />
        <div className="flex flex-col items-start text-xs md:text-sm">
          <div> {user.username}</div>
        </div>
      </button>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, searching, searchTerm]);

  return (
    <Dialog open={open} onOpenChange={(prev) => setOpen(prev)}>
      <DialogContent>
        <div className="flex justify-end px-2">
          <DialogClose asChild>
            <button type="button">
              <X />
            </button>
          </DialogClose>
        </div>
        <div className="px-4 h-[26rem]">
          <h3>Search Users</h3>
          <form className="mt-3">
            <Input
              name="username"
              placeholder="Search by username..."
              value={searchForm.values.username}
              onChange={searchForm.handleChange}
              className="w-full border-muted"
            />
          </form>
          <div>
            {searchForm.values.username &&
              searchForm.values.username.length > 0 && (
                <div className="mt-4  space-y-2 p-2">{userResults}</div>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUserForChat;
