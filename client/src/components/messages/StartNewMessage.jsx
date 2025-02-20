import { X } from "lucide-react";
import { searchState } from "@/config";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/ui/Avatar";
import { useUserStore } from "@/store/useUserStore";
import { useMessageStore } from "@/store/useMessageStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import SearchLoading from "@/components/skeleton/SearchLoading";
import { useEffect, useMemo, useCallback, useRef } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

const StartNewMessage = ({ open, setOpen }) => {
  const debounceRef = useRef(null);
  const { setSelectedUser } = useMessageStore();
  const searchForm = useFormSchema(searchState);
  const { users, searchUser, searching, searchTerm } = useUserStore();

  const handleStartNewMessage = (userId) => {
    setSelectedUser(userId);
    setOpen(false);
  };

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
      <button
        onClick={() => handleStartNewMessage(user.userId)}
        className="btn-selection"
        key={user.userId}
      >
        <Avatar avatar={user.avatar} />
        <div className="flex flex-col items-start text-xs md:text-sm">
          <div> {user.username}</div>
          <p>online</p>
        </div>
      </button>
    ));
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
          <div className="">
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

export default StartNewMessage;
