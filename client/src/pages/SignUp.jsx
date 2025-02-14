import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import InputForm from "@/components/form/InputForm";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { Card, CardContent } from "@/components/ui/card";
import { signUpControl, signUpState } from "@/config";

const SignUp = () => {
  const { signup, loading } = useAuthStore();
  const SignUpForm = useFormSchema(signUpState, signUpControl, signup);

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="p-4">
          <div className="py-4 text-center">
            <h3>Memegram</h3>
          </div>
          {/* signup form */}
          <InputForm formik={SignUpForm} formControl={signUpControl}>
            <InputButton formik={SignUpForm} title="signup" loading={loading} />
          </InputForm>

          <div className="flex items-center justify-center mt-2">
            <span className="px-2">OR</span>
          </div>
          {/* signup with google */}
          <Button className="w-full h-10 border rounded-md mt-2">
            <FcGoogle size={24} /> Sign up with Google
          </Button>
          <div className="text-center mt-2">
            Already have an account ? signin{" "}
            <Link to="/signin" className="hover-btn">
              here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
