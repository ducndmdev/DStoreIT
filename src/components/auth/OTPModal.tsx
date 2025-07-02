"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import { useState } from "react";

interface Props {
  accountId: string;
  email: string;
  open: boolean;
  onClose: () => void;
}

const OTPModal = ({ accountId, email, open, onClose }: Props) => {
  const [code, setCode] = useState("");

  const handleSubmit = async () => {};

  const handleResend = async () => {};

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="shad-alert-dialog!">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2!">Enter OTP</AlertDialogTitle>
          <Image
            src="/assets/icons/close-dark.svg"
            alt="close"
            width={24}
            height={24}
            className="otp-close-button!"
            onClick={onClose}
          />
          <AlertDialogDescription className="text-light-100">
            We've sent a code to <span className="text-brand-100">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup className="shad-otp!">
            <InputOTPSlot index={0} className="shad-otp-slot!" />
            <InputOTPSlot index={1} className="shad-otp-slot!" />
            <InputOTPSlot index={2} className="shad-otp-slot!" />
            <InputOTPSlot index={3} className="shad-otp-slot!" />
            <InputOTPSlot index={4} className="shad-otp-slot!" />
            <InputOTPSlot index={5} className="shad-otp-slot!" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <AlertDialogAction
            className="shad-submit-btn!"
            onClick={handleSubmit}
          >
            <span>Submit</span>
            <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              width={24}
              height={24}
              className="animate-spin"
            />
          </AlertDialogAction>
        </AlertDialogFooter>

        <div className="flex justify-center">
          <p className="text-light-100 body-14">
            <span>Didn’t get a code? </span>
            <span
              className="text-brand-100 cursor-pointer"
              onClick={handleResend}
            >
              Click to resend.
            </span>
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
