import { useAuthStore } from "@/store/useAuthStore";
import InputForm from "@/components/form/InputForm";
import { useFormSchema } from "@/hooks/useFormSchema";
import { signUpControl, signUpState } from "@/config";
import InputButton from "@/components/form/InputButton";

const SignUp = () => {
  const { userSignUp, loading } = useAuthStore();
  const signUpForm = useFormSchema(signUpState, signUpControl, userSignUp);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* <div className="relative hidden bg-muted lg:block">
        <img
          src="https://techmind.id/wp-content/uploads/2024/06/IG.jpeg"
          alt="Image"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
            isValid
              ? "brightness-100 grayscale-0"
              : "brightness-[0.2] grayscale dark"
          }`}
        />
      </div> */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <InputForm formik={signUpForm} formControl={signUpControl}>
              <InputButton
                title="signup"
                formik={signUpForm}
                loading={loading}
              />
            </InputForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
