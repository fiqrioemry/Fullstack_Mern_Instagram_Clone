/* eslint-disable react/prop-types */
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
import InputForm from "@/components/form/InputForm";
import InputButton from "@/components/form/InputButton";

const StepOne = ({ signUpForm, formControl }) => {
  return (
    <div className="space-y-4 w-full">
      <div className="text-center">
        <div className="text-sm">Choose to sign up with </div>
      </div>

      <InputForm formik={signUpForm} formControl={formControl}>
        <InputButton title={"Signup"} formik={signUpForm} />
      </InputForm>
      <div className="text-center text-sm">Or continue</div>
      <GoogleAuth buttonTitle={"Signup with google"} />
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/signin" className="btn-secondary">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default StepOne;
