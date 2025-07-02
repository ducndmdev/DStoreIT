"use client";

import AuthForm from "@/components/auth/AuthForm";
import { signUp } from "@/lib/actions/auth.actions";
import { signUpSchema } from "@/lib/validations/sign-up.validation";

const SignUpPage = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{ fullName: "", email: "" }}
      onSubmit={signUp}
    />
  );
};

export default SignUpPage;
