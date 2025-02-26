/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";

const SearchInput = ({ searchForm }) => {
  return (
    <>
      <h3>Search Users</h3>
      <form className="mt-3">
        <Input
          name="username"
          placeholder="Search by username..."
          value={searchForm?.values?.username}
          onChange={searchForm?.handleChange}
          className="w-full border-muted-foreground/20"
        />
      </form>
    </>
  );
};

export default SearchInput;
