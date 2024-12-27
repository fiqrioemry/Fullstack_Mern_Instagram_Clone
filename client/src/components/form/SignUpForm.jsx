import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { controlSignUpForm, initialSignUpForm } from "../../config";
import { useHandleForm } from "../../hooks/useHandleForm";
import { Link } from "react-router-dom";
import InstagramLogo from "../common/InstagramLogo";

const SignUpForm = () => {
  const { formData, handleChange, handleValidate, handleSubmit } =
    useHandleForm(initialSignUpForm);

  const isValid = handleValidate();

  const onSubmit = () => {
    console.log(formData);
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={(e) => handleSubmit(e, onSubmit)}
            className="p-6 md:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <InstagramLogo size={65} width={165} />
              </div>
              {controlSignUpForm.map((set) => (
                <div className="grid gap-2 capitalize" key={set.name}>
                  <Label htmlFor={set.name} className>
                    {set.name}
                  </Label>
                  <Input
                    id={set.name}
                    name={set.name}
                    type={set.type}
                    value={formData[set.name]}
                    onChange={handleChange}
                    placeholder={set.placeholder}
                    required
                  />
                </div>
              ))}

              <Button
                type="submit"
                variant="custom"
                disabled={!isValid}
                className="w-full"
              >
                Login
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default SignUpForm;
