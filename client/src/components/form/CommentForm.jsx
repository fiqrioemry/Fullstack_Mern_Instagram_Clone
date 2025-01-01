/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { useHandleForm } from "../../hooks/useHandleForm";

const CommentForm = ({
  initialFormConfig,
  initialFormState,
  postId = null,
}) => {
  const { formData, handleChange, handleSubmit, handleValidate } =
    useHandleForm(initialFormState);

  const isValid = handleValidate();
  return (
    <>
      {initialFormConfig.map((set) => (
        <form onSubmit={handleSubmit} key={set}>
          <div className="flex px-2">
            <textarea
              name={set.name}
              type={set.type}
              value={formData[set.name]}
              onChange={handleChange}
              placeholder="Add a comment ..."
              className="w-full h-[30px] text-sm bg-background resize-none  focus:outline-none overflow-y-scroll no-scrollbar"
            />
            <button>Post</button>
          </div>
        </form>
      ))}
    </>
  );
};

export default CommentForm;
