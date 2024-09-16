"use client";
import { Captions, ChevronLeft, SendHorizontal } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for form validation
const schema = z.object({
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

// Define the form values type
type FormValues = z.infer<typeof schema>;

function AddItem() {
  // Initialize React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  // Handle formatting of the amount input on blur
  const handleAmountBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setValue("amount", parseFloat(value.toFixed(2)), {
        shouldValidate: true, // Ensures validation happens after formatting
      });
    }
  };

  return (
    <div className="absolute top-0 flex flex-col h-screen w-screen max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl justify-center items-center gap-8">
      <div className="rounded-lg flex flex-col h-auto w-full shadow-md bg-base-200 gap-8 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <label className="self-start text-2xl" htmlFor="title">
            Add new budget
          </label>

          {/* Title input */}
          <div className="flex flex-col gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <Captions />
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="grow"
                {...register("title")}
              />
            </label>
            {errors.title && (
              <p className="text-error">{errors.title.message}</p>
            )}
          </div>

          {/* Quantity input */}
          <div className="flex flex-col gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <i className="fa-solid fa-boxes-stacked"></i>
              <input
                id="quantity"
                type="number"
                placeholder="Quantity"
                className="grow"
                {...register("quantity", {
                  valueAsNumber: true, // Convert to number
                })}
              />
            </label>
            {errors.quantity && (
              <p className="text-error">{errors.quantity.message}</p>
            )}
          </div>

          {/* Amount input */}
          <div className="flex flex-col gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <i className="fa-solid fa-baht-sign"></i>
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder="Amount"
                className="grow"
                {...register("amount", {
                  valueAsNumber: true, // Convert to number
                })}
                onBlur={handleAmountBlur}
              />
            </label>
            {errors.amount && (
              <p className="text-error">{errors.amount.message}</p>
            )}
          </div>

          {/* Submit button */}
          <div className="flex flex-col gap-4">
            <button type="submit" className="btn btn-primary">
              <SendHorizontal />
              Submit
            </button>

            {/* Back button */}
            <button type="button" className="btn btn-ghost">
              <ChevronLeft />
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
