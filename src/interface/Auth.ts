// types/formTypes.ts
import { SignupFormValues } from "@/type/zod/Auth";
import { SubmitHandler } from "react-hook-form";


export interface SignupFormProps {
    onSubmit: SubmitHandler<SignupFormValues>;
}