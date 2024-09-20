import { TitleInputProps } from "@/type/zod/Item";
import { Captions } from "lucide-react";
import { useForm, UseFormRegister } from "react-hook-form";


const TitleInput = ({ register, error }: TitleInputProps) => (
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
    {error && <p className="text-error">{error}</p>}
  </div>
);

export default TitleInput;
