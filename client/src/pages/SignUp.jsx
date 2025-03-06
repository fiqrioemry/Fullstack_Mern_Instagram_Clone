import {
  signUpState,
  signUpControl,
  sendOTPControl,
  verifyOTPControl,
} from "@/config";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StepOne from "@/components/auth/StepOne";
import StepTwo from "@/components/auth/StepTwo";
import StepThree from "@/components/auth/StepThree";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { Card, CardContent } from "@/components/ui/card";

const SignUp = () => {
  const navigate = useNavigate();
  const { step, signup, resetStep, loading } = useAuthStore();

  const getFormControl = () => {
    switch (step) {
      case 1:
        return sendOTPControl;
      case 2:
        return verifyOTPControl;
      case 3:
        return signUpControl;
      default:
        return [];
    }
  };

  const signUpForm = useFormSchema(
    signUpState,
    getFormControl(),
    signup,
    navigate,
    false
  );

  useEffect(() => {
    resetStep();
  }, [resetStep]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="min-w-80 h-96">
        <CardContent className="p-4">
          <div className="text-center">
            <h3>Moments</h3>
          </div>

          <div className="h-72 pt-6">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <Loader size={50} className="animate-spin" />
              </div>
            ) : (
              <>
                {step === 1 && (
                  <StepOne
                    signUpForm={signUpForm}
                    formControl={sendOTPControl}
                  />
                )}

                {step === 2 && (
                  <StepTwo
                    signUpForm={signUpForm}
                    formControl={verifyOTPControl}
                  />
                )}

                {step === 3 && (
                  <StepThree
                    signUpForm={signUpForm}
                    formControl={signUpControl}
                  />
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
