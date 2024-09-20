import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { SignupFormValues } from "@/type/zod/Auth";
import { FlexibleFormProps } from "@/interface/Auth";


const FlexibleForm: React.FC<FlexibleFormProps> = ({
  id,
  type,
  placeholder,
  label,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-lg">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...register(id)}
      />
      {error && <p className="text-error">{error.message}</p>}
    </div>
  );
};

export default FlexibleForm;
