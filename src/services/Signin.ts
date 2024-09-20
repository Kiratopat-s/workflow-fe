import { LoginRequest, LoginResponse } from '@/interface/Auth';
import { api } from '@/utils/api'; 
import axios from 'axios'; 

export const loginUser = async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/login', loginData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) { 
            return {
                message: error.response.data.message || 'An error occurred',
                token: '',
            };
        }
        return {
            message: 'An unknown error occurred',
            token: '',
        };
    }
};