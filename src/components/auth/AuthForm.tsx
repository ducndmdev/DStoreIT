"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SIGN_IN_PATH, SIGN_UP_PATH } from "@/constants/path.constants";
import { getFormPlaceholderAndLabel } from "@/lib/auth.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { ZodType } from "zod";
import OTPModal from "./OTPModal";

interface Props<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T, any, any>;
  defaultValues: DefaultValues<T>;
  onSubmit: (values: T) => Promise<{ message?: string; accountId?: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: T) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await onSubmit(values);
      if (response.message) {
        setErrorMessage(response.message);
      } else if (response.accountId) {
        setAccountId(response.accountId);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="form-title!">
        {type === "SIGN_IN" ? "Login" : "Create Account"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="auth-form">
          {Object.keys(defaultValues).map((key) => {
            const { placeholder, label } = getFormPlaceholderAndLabel(key);
            return (
              <FormField
                key={key}
                control={form.control}
                name={key as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item!">
                      <FormLabel className="shad-form-label!">
                        {label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="shad-input!"
                          placeholder={placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="shad-form-message!" />
                    </div>
                  </FormItem>
                )}
              />
            );
          })}

          <Button
            type="submit"
            className="form-submit-button!"
            disabled={loading}
          >
            {type === "SIGN_IN" ? "Login" : "Create Account"}

            {loading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="animate-spin"
              />
            )}
          </Button>
        </form>
      </Form>

      {errorMessage && <div className="error-message!">{errorMessage}</div>}

      <div className="flex justify-center gap-4">
        <p className="body-14 text-light-100">
          {type === "SIGN_IN"
            ? "Already have an account? "
            : "Don't have an account? "}
          <Link href={type === "SIGN_IN" ? SIGN_UP_PATH : SIGN_IN_PATH}>
            <span className="text-brand-100 cursor-pointer font-semibold">
              {type === "SIGN_IN" ? "Create Account" : "Login"}
            </span>
          </Link>
        </p>
      </div>

      {accountId && (
        <OTPModal
          accountId={accountId}
          email={form.getValues("email") as string}
          open={!!accountId}
          onClose={() => setAccountId("")}
        />
      )}
    </div>
  );
};

export default AuthForm;
