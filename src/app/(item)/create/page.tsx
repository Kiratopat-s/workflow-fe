"use client";
import React, { useState } from "react";

function InputCreatePageComponent({ name }: { name: string }) {
  return (
    <div className="absolute top-0 flex flex-col h-screen w-screen max-w-xs justify-center items-center gap-8">
      <label className="self-start text-4xl" htmlFor={`text-${name}`}>
        {name}
      </label>
      <input
        id={`text-${name}`}
        type="text"
        placeholder={name}
        className="input input-bordered w-full "
      />
    </div>
  );
}

function CreateItem() {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  return (
    <>
      <InputCreatePageComponent name={"title"} />
    </>
  );
}

export default CreateItem;
