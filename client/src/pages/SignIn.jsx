import { useAuthStore } from "@/store/useAuthStore";
import InputForm from "@/components/form/InputForm";
import { useFormSchema } from "@/hooks/useFormSchema";
import { signInControl, signInState } from "@/config";
import InputButton from "@/components/form/InputButton";

const SignIn = () => {
  const { signin, loading } = useAuthStore();
  const signInForm = useFormSchema(signInState, signInControl, signin);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <InputForm formik={signInForm} formControl={signInControl}>
              <InputButton
                formik={signInForm}
                title="signin"
                loading={loading}
              />
            </InputForm>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default SignIn;
