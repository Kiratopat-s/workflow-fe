"use client";
import { ChevronLeft, PackagePlus, SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import TitleInput from "./TitleInput";
import QuantityInput from "./QuantityInput";
import AmountInput from "./AmountInput";
import {
  AddItemFormProps,
  AddItemFormValues,
  AddItemSchema,
} from "@/type/zod/Item";

function BudgetForm({
  mode,
  initialValues,
  onSubmit,
  updateSuccess,
}: AddItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AddItemFormValues>({
    resolver: zodResolver(AddItemSchema),
    defaultValues: initialValues || { title: "", quantity: 0, amount: 0 },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const handleAmountBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setValue("amount", parseFloat(value.toFixed(2)), {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className="absolute top-0 flex flex-col h-screen w-screen max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl justify-center items-center gap-8">
      <div
        className={`rounded-lg flex flex-col h-auto w-full shadow-md bg-base-200 gap-8 p-8 transition-all duration-300 ease-in-out ${
          updateSuccess ? "ring-2 ring-green-500" : "ring-0"
        } 
        } ring-accent`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <label className="self-start text-2xl flex gap-2" htmlFor="title">
            {mode === "add" ? (
              <>
                <div className="flex flex-col justify-center">
                  <PackagePlus />
                </div>
                Add new budget
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center">
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
                Edit Requirement
              </>
            )}
          </label>

          {/* Title input */}
          <TitleInput register={register} error={errors.title?.message} />

          {/* Quantity input */}
          <QuantityInput register={register} error={errors.quantity?.message} />

          {/* Amount input */}
          <AmountInput
            register={register}
            error={errors.amount?.message}
            onBlur={handleAmountBlur}
          />

          {/* Submit button */}
          <div className="flex flex-col gap-4">
            <button type="submit" className="btn btn-primary">
              <SendHorizontal />
              {mode === "add" ? "Submit" : "Update"}
            </button>

            {/* Back button */}
            <button
              onClick={() => {
                window.history.back();
              }}
              type="button"
              className="btn btn-ghost"
            >
              <ChevronLeft />
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BudgetForm;
