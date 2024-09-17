import { z } from "zod";

// Define Zod schema for form validation
export const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

// Define the form values type
export type LoginFormValues = z.infer<typeof LoginSchema>;