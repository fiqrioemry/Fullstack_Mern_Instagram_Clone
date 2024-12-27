import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { controlSignInForm, initialSignInForm } from "../../config";
import InstagramLogo from "../common/InstagramLogo";
import { useHandleForm } from "../../hooks/useHandleForm";

const SignInForm = () => {
  const { formData, handleChange, handleValidate, handleSubmit } =
    useHandleForm(initialSignInForm);

  const isValid = handleValidate();

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <InstagramLogo size={65} width={165} />
      </div>
      <div className="grid gap-6">
        {controlSignInForm.map((set) => (
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
  );
};

export default SignInForm;
