import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import InputForm from "@/components/form/InputForm";
import { signInControl, signInState } from "@/config";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "@/components/form/InputButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
const SignIn = () => {
  const { signin, loading } = useAuthStore();
  const signInForm = useFormSchema(signInState, signInControl, signin);

  return (
    <div className="screen-center">
      <Card>
        <CardContent className="p-4">
          <div className="py-4 text-center">
            <h3>Momengram</h3>
          </div>
          {/* signin form */}
          <InputForm formik={signInForm} formControl={signInControl}>
            <InputButton formik={signInForm} title="signin" loading={loading} />
          </InputForm>{" "}
          <div className="flex-center py-2">OR</div>
          <Button className="w-full">
            <FcGoogle size={24} /> Sign in with Google
          </Button>
          <CardFooter className="mt-2 space-x-2">
            <span> Dont have an account ? signup</span>
            <Link to="/signup" className="btn-primary">
              here
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
