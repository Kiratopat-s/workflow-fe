import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, SignupSchema } from "@/type/zod/Auth";
import { SignupFormProps } from "@/interface/Auth";
import Link from "next/link";
import { House } from "lucide-react";
import FlexibleForm from "../FlexibleForm";

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
  });

  const Signupfields = [
    {
      id: "username",
      type: "text",
      placeholder: "Enter your username",
      label: "Username",
      error: errors.username,
    },
    {
      id: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
      error: errors.password,
    },
    {
      id: "position",
      type: "text",
      placeholder: "Enter your position",
      label: "Position",
      error: errors.position,
    },
    {
      id: "first_name",
      type: "text",
      placeholder: "Enter your first name",
      label: "First Name",
      error: errors.first_name,
    },
    {
      id: "last_name",
      type: "text",
      placeholder: "Enter your last name",
      label: "Last Name",
      error: errors.last_name,
    },
    {
      id: "photo_link",
      type: "text",
      placeholder: "Enter your photo link",
      label: "Photo Link",
      error: errors.photo_link,
    },
  ] as const; 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {Signupfields.map((field) => (
        <FlexibleForm
          key={field.id}
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          label={field.label}
          register={register}
          error={field.error}
        />
      ))}

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
