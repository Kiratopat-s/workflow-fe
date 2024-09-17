import { z } from "zod";

// Define Zod schema for form validation
export const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

// Define the form values type
export type LoginFormValues = z.infer<typeof LoginSchema>;

// Define Zod schema for form validation
export const SignupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    position: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    photoLink: z.string().url("Photo link must be a valid URL").optional(),
});

export type SignupFormValues = z.infer<typeof SignupSchema>;