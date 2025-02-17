/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const PostInput = ({ postId, formik }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (formik.values.postId === postId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [formik.values.postId, formik.values.parentId]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex items-center">
      <input
        ref={inputRef}
        type="text"
        name="content"
        className="input-primary px-0"
        placeholder="Add a comment..."
        value={formik.values.content}
        onChange={formik.handleChange}
      />
      <button
        className="btn-accent"
        disabled={formik.values.content === "" || !formik.values.content}
      >
        Post
      </button>
    </form>
  );
};

export default PostInput;
