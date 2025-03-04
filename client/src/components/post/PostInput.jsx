/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import { useFormSchema } from "@/hooks/useFormSchema";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";

const PostInput = ({ postId }) => {
  const inputRef = useRef(null);

  const { selectedPost, selectedComment, createReply, createComment } =
    useCommentStore();

  const commentForm = useFormSchema(
    commentState,
    commentControl,
    selectedComment?.commentId ? createReply : createComment,
    postId
  );

  useEffect(() => {
    //
    if (selectedComment?.postId === postId && inputRef.current) {
      inputRef.current.focus();
    }
    //
    if (selectedComment?.commentId)
      commentForm.setFieldValue("content", `@${selectedComment?.username} `);
    //
  }, [selectedPost, selectedComment]);

  return (
    <form
      onSubmit={commentForm?.handleSubmit}
      className="flex items-center py-2"
    >
      <input
        ref={inputRef}
        type="text"
        name="content"
        placeholder="Add a comment..."
        className="input-primary text-sm px-0"
        value={commentForm?.values?.content}
        onChange={commentForm?.handleChange}
      />
      <button className="btn-accent" disabled={!commentForm?.values?.content}>
        Post
      </button>
    </form>
  );
};

export default PostInput;
