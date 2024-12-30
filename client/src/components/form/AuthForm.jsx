/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InstagramLogo from "../common/InstagramLogo";

const AuthForm = ({
  handleChange,
  formData,
  controlForm,
  submitTitle,
  footerTitle,
  footerLink,
  buttonTitle,
  path,
  isValid,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <InstagramLogo size={65} width={165} />
      </div>
      <div className="grid gap-6">
        {controlForm.map((set) => (
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
          size="md"
          disabled={!isValid}
          className="w-full"
        >
          {submitTitle}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" size="md" className="w-full">
          {buttonTitle}
        </Button>
      </div>
      <div className="text-center text-sm">
        {footerTitle}
        <Link to={path} className="underline underline-offset-4">
          {footerLink}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
