import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { House } from "lucide-react";
import { SignupFormValues, SignupSchema } from "@/type/zod/Auth";

interface FormProps {
  onSubmit: SubmitHandler<SignupFormValues>;
}

const SignupForm: React.FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      <div className="flex flex-col gap-2">
        <label htmlFor="position" className="text-lg">
          Position
        </label>
        <input
          id="position"
          type="text"
          placeholder="Enter your position"
          className="input input-bordered w-full"
          {...register("position")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="text-lg">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          className="input input-bordered w-full"
          {...register("firstName")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="lastName" className="text-lg">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          className="input input-bordered w-full"
          {...register("lastName")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="photoLink" className="text-lg">
          Photo Link
        </label>
        <input
          id="photoLink"
          type="text"
          placeholder="Enter your photo link"
          className="input input-bordered w-full"
          {...register("photoLink")}
        />
        {errors.photoLink && (
          <p className="text-error">{errors.photoLink.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <Link href={"/"} className="btn btn-ghost bg-base-100">
        <House />
      </Link>
    </form>
  );
};

export default SignupForm;
