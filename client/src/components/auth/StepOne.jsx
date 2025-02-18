/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/form/InputForm";
import InputButton from "@/components/form/InputButton";

const StepOne = ({ signUpForm, formControl }) => {
  return (
    <div className="space-y-4 w-full">
      <div className="text-center">
        <div className="text-sm">Choose to sign up with </div>
      </div>
      <Button variant="outline" className="w-full">
        <FcGoogle /> <span>Google</span>
      </Button>
      <div className="text-center">Or continue with</div>
      <InputForm formik={signUpForm} formControl={formControl}>
        <InputButton title={"Register"} formik={signUpForm} />
      </InputForm>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/signin" className="text_button">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default StepOne;
