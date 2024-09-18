import { itemStatus } from "@/interface/Item";
import { AddItemFormValues } from "@/type/zod/Item";
import axios, { AxiosError, HttpStatusCode } from "axios";
import toast from "react-hot-toast";

export const fetchItemsOverviewStatus = async () => {

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/items/status/count/user`,
            {
                withCredentials: true,
            }
        );
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
        const response = await axios.post<AddItemFormValues>(
            `${process.env.NEXT_PUBLIC_API_URL}/items`,
            data,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        if (error && (error as AxiosError).response) {
            throw new Error('Failed to add budget');
        } else {
            throw error;
        }
    }
}

export async function fetchItemsDashboard() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
        withCredentials: true,
    });
    return res.data.data;
}

export async function UpdateItemStatus({ status }: itemStatus, ids: number[]) {
    const start_timer = Date.now();
    try {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/items/update/status/many`,
            {
                status,
                ids,
            },
            {
                withCredentials: true,
            }
        );

        if (res.status === HttpStatusCode.Forbidden) {
            return toast.error("You are not authorized to update item status");
        }
        toast.success(`Updated item status in ${Date.now() - start_timer}ms`);
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === HttpStatusCode.Forbidden) {
                toast.error("You are not authorized to update item status");
            } else {
                toast.error("An error occurred while updating item status");
            }
        } else {
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred");
        }
        return false;
    }

}

export async function GetItemInfoById(id: number) {
    const start_timer = Date.now();
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, {
            withCredentials: true,
        });
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
        const res = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`,
            data,
            {
                withCredentials: true,
            }
        );
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
        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/items/delete/many`,
            {
                data: { ids },
                withCredentials: true,
            }
        );
        console.log(res.data);
        toast.success(`Deleted items in ${Date.now() - start_timer}ms`);
    } catch (error) {
        toast.error("Failed to delete items");
        console.log(error);
    }
}