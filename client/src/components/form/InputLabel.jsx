/* eslint-disable react/prop-types */

const InputLabel = ({ formik, control }) => {
  return (
    <div className="flex items-center gap-2 h-4 mb-2">
      <label htmlFor={control.label}>{control.label}</label>
      {formik.touched[control.name] && formik.errors[control.name] && (
        <h6>{formik.errors[control.name]}</h6>
      )}
    </div>
  );
};

export default InputLabel;
