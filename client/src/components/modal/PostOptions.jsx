/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

const PostOptions = ({ user }) => {
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
      <Link
        to={`/p/${user.postId}`}
        className="w-full flex items-center justify-center h-12 border-b"
      >
        Go to post
      </Link>
      <DialogClose className="w-full h-12">Close</DialogClose>
    </div>
  );
};

export default PostOptions;
