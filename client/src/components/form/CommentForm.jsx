/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { useHandleForm } from "../../hooks/useHandleForm";

const CommentForm = ({ initialFormConfig, initialFormState }) => {
  const { formData, handleChange, handleSubmit, handleValidate } =
    useHandleForm(initialFormState);

  const isValid = handleValidate();
  return (
    <>
      {initialFormConfig.map((set) => (
        <form onSubmit={handleSubmit} key={set}>
          <div className="flex items-center">
            <textarea
              name={set.name}
              type={set.type}
              value={formData[set.name]}
              onChange={handleChange}
              placeholder="Add a comment ..."
              className="w-full py-2 text-sm bg-background resize-none  focus:outline-none overflow-y-scroll no-scrollbar"
            />
            <Button disabled={!isValid}>Post</Button>
          </div>
        </form>
      ))}
    </>
  );
};

export default CommentForm;
