import { RegisterRequest, RegisterResponse } from '@/interface/Auth';
import { api } from '@/utils/api';
import axios from 'axios';



export const SignupUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await api.post<RegisterResponse>('/register', userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                message: error.response.data.message || 'An error occurred',
            };
        }
        return {
            success: false,
            message: 'An unknown error occurred',
        };
    }
};