/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { DialogClose } from "@/components/ui/dialog";

const SettingOptions = ({ user }) => {
  return (
    <div className="overflow-hidden rounded-xl">
      {user.isOwner ? (
        <button className=" w-full h-12 border-b">Edit</button>
      ) : (
        <Button variant="delete" className=" w-full h-12 border-b">
          Report
        </Button>
      )}

      {user.isOwner ? (
        <Button variant="delete" className=" w-full h-12 border-b">
          Delete
        </Button>
      ) : (
        <button className=" w-full h-12 border-b">Bookmark</button>
      )}

      <DialogClose className="w-full h-12">Close</DialogClose>
    </div>
  );
};

export default SettingOptions;
