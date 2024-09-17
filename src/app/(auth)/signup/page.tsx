"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/SignupForm";
import { SubmitHandler } from "react-hook-form";
import { SignupUser } from "@/services/Signup";
import { SignupFormValues } from "@/type/zod/Auth";

async function registerUser(data: SignupFormValues) {
  return SignupUser(data);
}

const Register: React.FC = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    const startTime = Date.now();
    const promise = registerUser(data)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        toast.error("Registration failed");
      });

    toast.promise(promise, {
      loading: "Processing...",
      success: () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        return `Registration successful (${duration} ms)`;
      },
      error: () => "Registration failed",
    });
  };

  return (
    <div className="absolute top-[20%] md:top-0 flex flex-col h-screen w-screen max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl justify-center items-center gap-8">
      <div className="rounded-lg flex flex-col h-auto w-full shadow-md bg-base-200 gap-8 p-8">
        <h1 className="text-2xl font-bold">Sing up</h1>
        <SignupForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Register;
