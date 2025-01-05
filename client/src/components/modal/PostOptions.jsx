import { Link } from "react-router-dom";
import { DialogClose } from "@radix-ui/react-dialog";

const PostOptions = ({ postId }) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <button className=" w-full h-12 border-b">Delete</button>
      <button className="w-full h-12 border-b">Edit</button>
      <Link
        to={`/p/${postId}`}
        className="w-full flex items-center justify-center  h-12 border-b"
      >
        Go to post
      </Link>
      <DialogClose className="w-full h-12">Close</DialogClose>
    </div>
  );
};

export default PostOptions;
