"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { setCookie } from "nookies";
import { loginUser } from "@/services/Signin";
import { LoginFormValues, LoginSchema } from "@/type/zod/Auth";

function Login() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  // Initialize react-hook-form with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const startTime = Date.now();
    try {
      const response = await loginUser(data);
      const endTime = Date.now();
      const duration = endTime - startTime;

      if (response.token) {
        // Save token in a cookie, accessible by both client and server
        setCookie(null, "token", response.token, {
          maxAge: 30 * 60,
          path: "/",
        });
        // Update AuthContext with user information
        login(response.token);
        toast.success(`Login successful (Duration: ${duration}ms)`);
        router.push("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="absolute top-0 flex flex-col h-screen w-screen max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl justify-center items-center gap-8">
      <div className="rounded-lg flex flex-col h-auto w-full shadow-md bg-base-200 gap-8 p-8">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-lg">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-error">{errors.username.message}</p>
            )}
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-error">{errors.password.message}</p>
            )}
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            <LogIn />
            Login
          </button>
          <p className="text-center">Don&apos;t have account yet ?</p>
          <Link href={"/signup"} className=" btn btn-ghost bg-base-300">
            <UserPlus />
            Signup
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
