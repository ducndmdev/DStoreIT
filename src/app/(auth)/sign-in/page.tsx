"use client";

import AuthForm from "@/components/auth/AuthForm";
import { signIn } from "@/lib/actions/auth.actions";
import { signInSchema } from "@/lib/validations/sign-in.validation";

const SignInPage = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "" }}
      onSubmit={signIn}
    />
  );
};

export default SignInPage;
