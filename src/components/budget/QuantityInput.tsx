import { QuantityInputProps } from "@/type/zod/Item";
import { useForm, UseFormRegister } from "react-hook-form";


const QuantityInput = ({ register, error }: QuantityInputProps) => (
  <div className="flex flex-col gap-2">
    <label className="input input-bordered flex items-center gap-2">
      <i className="fa-solid fa-boxes-stacked"></i>
      <input
        id="quantity"
        type="number"
        placeholder="Quantity"
        className="grow"
        {...register("quantity", {
          valueAsNumber: true,
        })}
      />
    </label>
    {error && <p className="text-error">{error}</p>}
  </div>
);

export default QuantityInput;
