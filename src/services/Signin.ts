// services/login.ts
import axios from 'axios';

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    message: string;
    token: string;
}

// Define the API endpoint from environment variables
const API_BACK_END = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const loginUser = async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_BACK_END}/login`, loginData);
        return response.data;
    } catch (error) {
        // Handle error appropriately
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