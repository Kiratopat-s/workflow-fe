"use client";
import BudgetForm from "@/components/budget/BudgetForm";
import { useItemStatus } from "@/context/ItemStatusContext";
import { AddNewItem } from "@/services/item/Items";
import { AddItemFormValues } from "@/type/zod/Item";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AddBudget() {
  const { fetchItemStatus } = useItemStatus();
  const router = useRouter();

  const handleAddSubmit = async (data: AddItemFormValues) => {
    const startTime = Date.now();
    try {
      await AddNewItem(data);
      toast.success(`Budget added (Duration: ${Date.now() - startTime}ms)`);
      await fetchItemStatus();
      router.push("/");
    } catch (error) {
      console.error("Add budget error:", error);
      toast.error("Failed to add budget");
    }
  };

  return <BudgetForm mode="add" onSubmit={handleAddSubmit} />;
}

export default AddBudget;
