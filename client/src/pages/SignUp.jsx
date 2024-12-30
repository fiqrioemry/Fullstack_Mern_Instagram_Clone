import AuthForm from "../components/form/AuthForm";
import { useHandleForm } from "../hooks/useHandleForm";
import { controlSignUpForm, initialSignUpForm } from "../config";

const SignUp = () => {
  const { formData, handleChange, handleSubmit, handleValidate } =
    useHandleForm(initialSignUpForm);

  const isValid = handleValidate();

  const onSubmit = () => {
    console.log("Form submitted successfully:", formData);
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://techmind.id/wp-content/uploads/2024/06/IG.jpeg"
          alt="Image"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
            isValid
              ? "brightness-100 grayscale-0"
              : "dark:brightness-[0.2] dark:grayscale dark"
          }`}
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm
              onSubmit={(e) => handleSubmit(e, onSubmit)}
              formData={formData}
              controlForm={controlSignUpForm}
              submitTitle={"Sign-Up"}
              buttonTitle={"Sign Up with Google"}
              footerTitle={"Already have an account ? "}
              footerLink={"Sign in "}
              path="/signin"
              handleChange={handleChange}
              isValid={isValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
