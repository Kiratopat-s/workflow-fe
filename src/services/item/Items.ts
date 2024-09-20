import { itemStatus } from "@/interface/Item";
import { AddItemFormValues } from "@/type/zod/Item";
import { AxiosError, HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import { api } from "@/utils/api";

export const fetchItemsOverviewStatus = async () => {
    try {
        const response = await api.get("/items/status/count/user");
        return response.data.data;
    } catch (error) {
        if (error && (error as AxiosError).response) {
            throw new Error("Failed to fetch items overview status");
        } else {
            throw error;
        }
    }
};

export const AddNewItem = async (data: AddItemFormValues) => {
    try {
        const response = await api.post<AddItemFormValues>("/items", data);
        return response.data;
    } catch (error) {
        if (error && (error as AxiosError).response) {
            throw new Error("Failed to add budget");
        } else {
            throw error;
        }
    }
};

export async function fetchItemsDashboard() {
    const res = await api.get("/items");
    return res.data.data;
}

export async function UpdateItemStatus({ status }: itemStatus, ids: number[]) {
    const start_timer = Date.now();
    try {
        const res = await api.patch("/items/update/status/many", {
            status,
            ids,
        });

        if (res.status === HttpStatusCode.Forbidden) {
            return toast.error("You are not authorized to update item status");
        }
        toast.success(`Updated item status in ${Date.now() - start_timer}ms`);
        return true;
    } catch (error) {
        if ((error as AxiosError).response?.status === HttpStatusCode.Forbidden) {
            toast.error("You are not authorized to update item status");
        } else {
            toast.error("An error occurred while updating item status");
        }
        return false;
    }
}

export async function GetItemInfoById(id: number) {
    const start_timer = Date.now();
    try {
        const res = await api.get(`/items/${id}`);
        toast.success(`Fetched item info in ${Date.now() - start_timer}ms`);
        return res.data.data;
    } catch (error) {
        toast.error("Failed to get item info");
        console.log(error);
    }
}

export async function UpdateItemById(id: number, data: AddItemFormValues) {
    const start_timer = Date.now();
    try {
        const res = await api.put(`/items/${id}`, data);
        toast.success(`Updated item in ${Date.now() - start_timer}ms`);
        return res;
    } catch (error) {
        toast.error("Failed to update item");
        console.log(error);
    }
}

export async function DeleteItems(ids: number[]) {
    const start_timer = Date.now();
    try {
        const res = await api.delete("/items/delete/many", {
            data: { ids },
        });
        console.log(res.data);
        toast.success(`Deleted items in ${Date.now() - start_timer}ms`);
    } catch (error) {
        toast.error("Failed to delete items");
        console.log(error);
    }
}