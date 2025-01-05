import { Button } from "../ui/button";

const CommentForm = () => {
  return (
    <form>
      <div className="flex items-center">
        <textarea
          placeholder="Add a comment ..."
          className="w-full flex items-center text-sm bg-background resize-none  focus:outline-none overflow-y-scroll no-scrollbar"
        />
        <Button type="submit">Post</Button>
      </div>
    </form>
  );
};

export default CommentForm;
