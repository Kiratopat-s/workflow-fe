"use client";
import BudgetForm, { FormValues } from "@/components/budget/BudgetForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AddBudget() {
  const router = useRouter();

  const handleAddSubmit = async (data: FormValues) => {
    const startTime = Date.now();
    try {
      // No need to manually add the token if it's already in a cookie and the cookie is set for the domain/path
      const response = await axios.post<FormValues>(
        `${process.env.NEXT_PUBLIC_API_URL}/items`,
        // send all header and cookie
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(`Budget added (Duration: ${Date.now() - startTime}ms)`);
      router.push("/dashboard");
    } catch (error) {
      console.error("Add budget error:", error);
      toast.error("Failed to add budget");
    }
  };

  return <BudgetForm mode="add" onSubmit={handleAddSubmit} />;
}

export default AddBudget;
