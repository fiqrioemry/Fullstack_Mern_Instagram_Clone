import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import InputForm from "@/components/form/InputForm";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { signUpControl, signUpState } from "@/config";
import { CardFooter } from "../components/ui/card";

const SignUp = () => {
  const { signup, loading } = useAuthStore();
  const SignUpForm = useFormSchema(signUpState, signUpControl, signup);

  return (
    <div className="h-screen flex-center">
      <Card>
        <CardContent>
          <CardHeader>
            <h3 className="text-center">Momengram</h3>
          </CardHeader>

          <InputForm formik={SignUpForm} formControl={signUpControl}>
            <InputButton formik={SignUpForm} title="signup" loading={loading} />
          </InputForm>

          <div className="flex-center py-2">OR</div>

          <Button className="w-full">
            <FcGoogle size={24} /> Sign up with Google
          </Button>
          <CardFooter className="mt-2 space-x-2">
            <span> Already have an account ? signin</span>
            <Link to="/signin" className="btn-primary">
              here
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
