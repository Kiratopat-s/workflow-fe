"use client";
import BudgetForm, { FormValues } from "@/components/budget/BudgetForm";

function AddBudget() {
  const handleAddSubmit = async (data: FormValues) => {
    // Submit POST request
    try {
      const response = await fetch("/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add budget");
      }

      console.log("Budget added successfully");
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  return <BudgetForm mode="add" onSubmit={handleAddSubmit} />;
}

export default AddBudget;
