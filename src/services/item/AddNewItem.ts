import { AddItemFormValues } from "@/type/zod/Item";
import axios, { AxiosError } from "axios";


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