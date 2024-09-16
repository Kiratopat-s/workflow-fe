"use client";
import BudgetForm, { FormValues } from "@/components/budget/BudgetForm";
import { useEffect, useState } from "react";

function UpdateBudget() {
  const [initialValues, setInitialValues] = useState<Partial<FormValues>>({
    title: "Fetched title",
    quantity: 5,
    amount: 2000,
  });

  useEffect(() => {
    // Fetch budget data from API
    // setInitialValues(data);
  }, []);

  const handleUpdateSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      {initialValues ? (
        <BudgetForm
          mode="update"
          initialValues={initialValues}
          onSubmit={handleUpdateSubmit}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default UpdateBudget;
