import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    position: z.string().refine((value) => value === "Admin" || value === "User", {
        message: "Position must be either 'Admin' or 'User'",
    }),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    photo_link: z.string().url("Photo link must be a valid URL"),
});

export type SignupFormValues = z.infer<typeof SignupSchema>;