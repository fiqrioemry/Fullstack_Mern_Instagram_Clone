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
        <form onSubmit={handleSubmit} className={set.formStyle} key={set}>
          <div className={set.wrapperStyle}>
            <textarea
              name={set.name}
              type={set.type}
              value={formData[set.name]}
              onChange={handleChange}
              placeholder="Add a comment ..."
              className={set.inputStyle}
            />
            <Button disabled={!isValid}>Post</Button>
          </div>
        </form>
      ))}
    </>
  );
};

export default CommentForm;
