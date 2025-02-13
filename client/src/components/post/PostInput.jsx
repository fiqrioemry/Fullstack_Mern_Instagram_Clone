/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

const PostInput = ({ postId, formik }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (formik.values.postId === postId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [formik.values.content]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          name="content"
          placeholder="Add a comment..."
          value={formik.values.content}
          onChange={formik.handleChange}
          className="flex-1 text-sm focus:outline-none"
        />
        <button
          className="text-blue-500 font-medium disabled:text-gray-500"
          disabled={!formik.dirty}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostInput;
