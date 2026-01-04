"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useVerifyUser } from "@/hooks/useVerifyUser";
import { useState } from "react";
import OtpVerification from "./otp-verification";
import NameInput from "./name-input";
import { useRouter } from "next/navigation";

import Link from "next/link";

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type Step = "PHONE" | "OTP" | "NAME";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { verifyUser, loading, error: apiError } = useVerifyUser();
  const [step, setStep] = useState<Step>("PHONE");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serverOtp, setServerOtp] = useState<string | null>(null);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string | null>(null);


  const onSubmit = async (data: LoginFormValues) => {
    const response = await verifyUser(data.phone);

    if (response) {
      setPhoneNumber(data.phone);
      setServerOtp(response.otp);
      setIsExistingUser(response.user);

      // If user exists and token is provided, store it
      if (response.user && response.token?.access) {
        localStorage.setItem("accessToken", response.token.access);
      }

      setStep("OTP");
    }
  };

  const handleVerifyOtp = (otp: string) => {
    setOtpError(null);
    if (otp === serverOtp) {
      if (isExistingUser) {
        router.push("/"); // Redirect to landing page
      } else {
        setStep("NAME");
      }
    } else {
      setOtpError("Invalid OTP");
    }
  };

  const handleBack = () => {
    setStep("PHONE");
    setServerOtp(null);
    setOtpError(null);
  };

  const handleRegisterSuccess = () => {
    router.push("/"); // Redirect after successful registration
  }

  return (
    <div className="w-full h-screen flex">
      {/* Image section */}
      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/login.png"
          alt="Login"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content section */}
      <div className="w-full md:w-1/2 bg-black flex justify-center items-center">
        <div className="flex flex-col justify-center items-center h-full gap-6 w-full max-w-md px-6 z-10 transition-all duration-500">
          {step === "PHONE" && (
            <>
              <h4 className="text-white text-[28px] font-inter text-center mb-8 font-semibold">
                Login
              </h4>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 w-full"
              >
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="phone"
                    className="text-sm text-white font-medium text-[16px]"
                  >
                    Phone
                  </label>
                  <Input
                    {...register("phone")}
                    id="phone"
                    className="bg-[#1a1a1a] border-0 p-6 placeholder:text-gray-600 placeholder:text-[15px] placeholder:font-normal text-white"
                    placeholder="Enter Phone"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {apiError && (
                  <p className="text-red-500 text-sm text-center">{apiError}</p>
                )}

                <Button
                  type="submit"
                  className="bg-white text-black p-6 w-full hover:bg-gray-200 transition-colors cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Continue"}
                </Button>
              </form>
            </>
          )}

          {step === "OTP" && (
            <>
              <OtpVerification
                phoneNumber={phoneNumber}
                onBack={handleBack}
                onVerify={handleVerifyOtp}
                serverOtp={serverOtp}
              />
              {otpError && (
                <p className="text-red-500 text-sm text-center mt-2">{otpError}</p>
              )}
            </>
          )}

          {step === "NAME" && (
            <NameInput
              phoneNumber={phoneNumber}
              onRegisterSuccess={handleRegisterSuccess}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;