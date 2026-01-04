import { useState } from "react";
import axiosInstance from "../lib/config/axios";
import { AxiosError } from "axios";

interface VerifyUserRequest {
    phone_number: string;
}

interface VerifyUserResponse {
    otp: string;
    token: {
        access: string;
    };
    user: boolean;
}

interface UseVerifyUserResult {
    verifyUser: (phoneNumber: string) => Promise<VerifyUserResponse | null>;
    loading: boolean;
    error: string | null;
    data: VerifyUserResponse | null;
}

export const useVerifyUser = (): UseVerifyUserResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<VerifyUserResponse | null>(null);

    const verifyUser = async (phoneNumber: string): Promise<VerifyUserResponse | null> => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axiosInstance.post<VerifyUserResponse>("/verify/", {
                phone_number: phoneNumber,
            });

            setData(response.data);
            return response.data;
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message || err.message || "Failed to verify user.";
            setError(errorMessage);
            // Rethrow if needed by the component, or just rely on state
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { verifyUser, loading, error, data };
};
