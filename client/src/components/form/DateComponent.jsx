/* eslint-disable react/prop-types */
import InputLabel from "./InputLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateComponent = ({
  formik,
  name,
  label,
  value,
  placeholder,
  disabled,
}) => {
  return (
    <div className="mb-4">
      <InputLabel formik={formik} name={name} label={label} />
      <DatePicker
        selected={value}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat="dd MMMM yyyy"
        disabled={disabled}
        placeholderText={placeholder}
        className="border p-2 rounded w-full text-center"
        onChange={(date) => formik.setFieldValue(name, date)}
      />
    </div>
  );
};

export default DateComponent;
