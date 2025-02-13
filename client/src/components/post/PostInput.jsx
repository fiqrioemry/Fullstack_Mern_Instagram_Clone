/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useFormSchema } from "@/hooks/useFormSchema";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";
import { useMemo } from "react";

const PostInput = ({ postId }) => {
  const inputRef = useRef(null);
  const { createComment, activePostId, activeInput } = useCommentStore();

  const isActive = useMemo(
    () => activePostId === postId,
    [activePostId, postId]
  );

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive, activeInput.content]);

  const commentForm = useFormSchema(
    {
      ...commentState,
      parentId: activeInput.commentId,
      content: activeInput.content,
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
