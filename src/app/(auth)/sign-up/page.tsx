"use client";

import AuthForm from "@/components/auth/AuthForm";
import { signUpSchema } from "@/lib/validations/sign-up.validation";

const SignUpPage = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{ fullName: "", email: "" }}
      onSubmit={async () => {
        return {
          message: "Success",
        };
      }}
    />
  );
};

export default SignUpPage;
