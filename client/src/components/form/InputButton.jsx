/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const InputButton = ({ formik, title, loading, type = "submit" }) => {
  return (
    <Button
      type={type}
      variant="follow"
      disabled={!((formik.isValid && formik.dirty) || loading)}
    >
      {loading ? <Loader className="animate-spin" /> : title}
    </Button>
  );
};

export default InputButton;
