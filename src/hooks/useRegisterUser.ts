import Cookies from "js-cookie";
import { useState } from "react";
import axiosInstance from "../lib/config/axios";

interface RegisterUserRequest {
    name: string;
    phone_number: string;
    unique_id?: string;
}

interface RegisterUserResponse {
    token: {
        access: string;
    };
    user_id: string;
    name: string;
    phone_number: string;
    message: string;
}

interface UseRegisterUserResult {
    registerUser: (data: RegisterUserRequest) => Promise<RegisterUserResponse | null>;
    loading: boolean;
    error: string | null;
    data: RegisterUserResponse | null;
}

export const useRegisterUser = (): UseRegisterUserResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<RegisterUserResponse | null>(null);

    const registerUser = async (requestData: RegisterUserRequest): Promise<RegisterUserResponse | null> => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axiosInstance.post<RegisterUserResponse>("/login-register/", requestData);

            setData(response.data);
            // Store token if needed, usually handled in components or context
            if (typeof window !== "undefined" && response.data.token?.access) {
                localStorage.setItem("accessToken", response.data.token.access);
                Cookies.set("accessToken", response.data.token.access, { expires: 7 });
            }
            return response.data;
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message || err.message || "Failed to register user.";
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { registerUser, loading, error, data };
};
