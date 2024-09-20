import { AmountInputProps } from "@/type/zod/Item";
import { useForm, UseFormRegister } from "react-hook-form";


const AmountInput = ({ register, error, onBlur }: AmountInputProps) => (
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
          valueAsNumber: true,
        })}
        onBlur={onBlur}
      />
    </label>
    {error && <p className="text-error">{error}</p>}
  </div>
);

export default AmountInput;
