/* eslint-disable react/prop-types */
const PostImageForm = ({ title, label, handleChange, style }) => {
  return (
    <div className="text-center space-y-3">
      <h5>{title}</h5>
      <div>
        <label htmlFor="file" className={style}>
          {label}
        </label>
        <input
          type="file"
          id="file"
          name="images"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PostImageForm;
