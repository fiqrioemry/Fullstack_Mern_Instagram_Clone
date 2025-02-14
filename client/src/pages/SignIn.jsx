import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import InputForm from "@/components/form/InputForm";
import { signInControl, signInState } from "@/config";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { Card, CardContent } from "@/components/ui/card";
const SignIn = () => {
  const { signin, loading } = useAuthStore();
  const signInForm = useFormSchema(signInState, signInControl, signin);

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="p-4">
          <div className="py-4 text-center">
            <h3>Momengram</h3>
          </div>
          {/* signin form */}
          <InputForm formik={signInForm} formControl={signInControl}>
            <InputButton formik={signInForm} title="signin" loading={loading} />
          </InputForm>

          {/* another signin options */}
          <div className="flex items-center justify-center mt-2">
            <span className="px-2">OR</span>
          </div>
          <Button className="w-full h-10 border rounded-md mt-2">
            <FcGoogle size={24} /> Sign in with Google
          </Button>
          <div className="text-center mt-2">
            Dont have an account ? signup{" "}
            <Link to="/signup" className="hover-btn">
              here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
