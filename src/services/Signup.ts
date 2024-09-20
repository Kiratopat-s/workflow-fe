// services/register.ts
import axios from 'axios';

interface RegisterRequest {
    username: string;
    password: string;
    position: string;
    first_name: string;
    last_name: string;
    photo_link: string;
}

interface RegisterResponse {
    success: boolean;
    message: string;
}

// Define the API endpoint from environment variables
const API_BACK_END = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2024';

export const SignupUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(`${API_BACK_END}/register`, userData);
        if (response.status !== 200) {
            return {
                success: false,
                message: response.statusText || 'An error occurred',
            };
        }
        return response.data;
    } catch (error) {
        // Handle error appropriately
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