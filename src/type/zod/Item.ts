import { SubmitHandler, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const AddItemSchema = z.object({
    title: z.string().min(1, "Title is required").max(30, "Title is too long"),
    quantity: z
        .number({ invalid_type_error: "Quantity must be a number" })
        .min(1, "Quantity must be at least 1"),
    amount: z
        .number({ invalid_type_error: "Amount must be a number" })
        .min(0, "Amount must be at least 0")
        .refine((value) => Number(value.toFixed(2)) === value, {
            message: "Amount must have at most 2 decimal places",
        }),
});

export type AddItemFormValues = z.infer<typeof AddItemSchema>;

export type AddItemFormProps = {
    mode: "add" | "update";
    initialValues?: Partial<AddItemFormValues>;
    onSubmit: SubmitHandler<AddItemFormValues>;
    updateSuccess?: boolean;
};

export type AmountInputProps = {
    register: UseFormRegister<{
        title: string;
        quantity: number;
        amount: number;
    }>;
    error?: string;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};
export type QuantityInputProps = {
    register: UseFormRegister<{
        title: string;
        quantity: number;
        amount: number;
    }>;
    error?: string;
};

export type TitleInputProps = {
    register: UseFormRegister<{
        title: string;
        quantity: number;
        amount: number;
    }>;
    error?: string;
};