/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef } from "react";
import { useFormSchema } from "@/hooks/useFormSchema";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";

const PostInput = ({ postId }) => {
  const inputRef = useRef(null);
  const { createComment, currentPost, currentInput } = useCommentStore();

  const isActive = useMemo(() => currentPost === postId, [currentPost, postId]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive, currentInput.content]);

  const commentForm = useFormSchema(
    {
      ...commentState,
      parentId: currentInput.commentId,
      content: currentInput.content,
    },
    commentControl,
    createComment,
    postId
  );

  return (
    <div>
      <form onSubmit={commentForm.handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          name="content"
          placeholder="Add a comment..."
          value={commentForm.values.content}
          onChange={commentForm.handleChange}
          className="flex-1 text-sm focus:outline-none"
        />
        <button
          className="text-blue-500 font-medium disabled:text-gray-500"
          disabled={!commentForm.dirty}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostInput;
