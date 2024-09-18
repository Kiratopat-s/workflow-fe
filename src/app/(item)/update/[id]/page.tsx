"use client";

import Loading from "@/app/loadging";
import BudgetForm from "@/components/budget/BudgetForm";
import { useItemStatus } from "@/context/ItemStatusContext";
import { GetItemInfoById, UpdateItemById } from "@/services/item/Items";
import { AddItemFormValues } from "@/type/zod/Item";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";

function UpdateBudget({ params }: { params: { id: number } }) {
  const { fetchItemStatus } = useItemStatus();
  const itemId = params.id;

  const [initialValues, setInitialValues] =
    useState<Partial<AddItemFormValues> | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchItemInfo = async () => {
      try {
        const data = await GetItemInfoById(itemId);
        setInitialValues(data);
      } catch (err) {
        setError("Failed to fetch item data.");
        console.error(err);
      } finally {
        setLoading(false); // Ensure loading is set to false once the fetch is done
      }
    };

    fetchItemInfo();
  }, [itemId]); // Add itemId as a dependency to re-fetch if it changes

  async function UpdateAnimation() {
    // Simulate a successful data update
    setUpdateSuccess(true);

    // Reset the animation after 600ms
    setTimeout(() => {
      setUpdateSuccess(false);
    }, 600);
  }

  const handleUpdateSubmit = async (data: AddItemFormValues) => {
    try {
      const res = await UpdateItemById(itemId, data);
      if (res?.status === HttpStatusCode.Ok) {
        UpdateAnimation();
        await fetchItemStatus();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {initialValues && (
        <BudgetForm
          mode="update"
          initialValues={initialValues}
          onSubmit={handleUpdateSubmit}
          updateSuccess={updateSuccess}
        />
      )}
    </>
  );
}

export default UpdateBudget;
