import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import InputForm from "@/components/form/InputForm";
import { signInControl, signInState } from "@/config";
import { useFormSchema } from "@/hooks/useFormSchema";
import GoogleAuth from "@/components/auth/GoogleAuth";
import InputButton from "@/components/form/InputButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
const SignIn = () => {
  const { signin, loading } = useAuthStore();
  const signInForm = useFormSchema(
    signInState,
    signInControl,
    signin,
    null,
    false
  );

  return (
    <div className="screen-center">
      <Card>
        <CardContent className="p-4">
          <div className="py-4 text-center">
            <h3>LOGO</h3>
          </div>
          <InputForm formik={signInForm} formControl={signInControl}>
            <InputButton formik={signInForm} title="signin" loading={loading} />
          </InputForm>
          <div className="flex-center py-2">OR</div>
          <GoogleAuth buttonTitle={"Signin with google"} />
          <CardFooter className="mt-2 space-x-2">
            <span> Dont have an account ? signup</span>
            <Link to="/signup" className="btn-secondary">
              here
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
