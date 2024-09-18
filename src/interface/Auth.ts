// types/formTypes.ts
import { SignupFormValues } from "@/type/zod/Auth";
import { SubmitHandler } from "react-hook-form";


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