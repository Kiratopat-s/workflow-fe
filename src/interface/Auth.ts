import { SignupFormValues } from "@/type/zod/Auth";
import { FieldError, SubmitHandler, UseFormRegister } from "react-hook-form";


export interface SignupFormProps {
    onSubmit: SubmitHandler<SignupFormValues>;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export interface User {
    uid: number;
    username: string;
    firstName: string;
    lastName: string;
    photoLink: string;
    position: string;
    tokenExpire?: Date;
}

export interface JwtPayload {
    exp: number;
    firstName: string;
    lastName: string;
    photoLink: string;
    position: string;
    uid: number;
    username: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    position: string;
    first_name: string;
    last_name: string;
    photo_link: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
}

export interface FlexibleFormProps {
    id: keyof SignupFormValues; 
    type: string;
    placeholder: string;
    label: string;
    register: UseFormRegister<SignupFormValues>;
    error?: FieldError;
  }