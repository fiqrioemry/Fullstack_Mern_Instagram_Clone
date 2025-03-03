import { useEffect } from "react";
import { useFormik } from "formik";
import { newValidationSchema } from "@/lib/utils";

export const useFormSchema = (
  state,
  control,
  action,
  params,
  resetOnSubmit = true
) => {
  const formik = useFormik({
    initialValues: state,
    validationSchema: newValidationSchema(control),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        await action(values, params);

        if (resetOnSubmit) resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (Object.keys(state).length) {
      formik.setValues(state);
      formik.validateForm();
    }
  }, [state, formik]);

  return formik;
};
