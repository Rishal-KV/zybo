"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/config/axios";

/* ================= TYPES ================= */

export interface UserOrder {
    order_id: string;
    created_date: string;
    product_name: string;
    product_price: number;
    product_mrp: number;
    product_amount: number;
    quantity: number;
    product_image: string;
}

interface UserOrdersResponse {
    count: number;
    orders: UserOrder[];
}

interface UseUserOrdersResult {
    orders: UserOrder[];
    count: number;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/* ================= HOOK ================= */

export const useUserOrders = (): UseUserOrdersResult => {
    const [orders, setOrders] = useState<UserOrder[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get<UserOrdersResponse>(
                "/user-orders/"
            );

            setOrders(response.data.orders ?? []);
            setCount(response.data.count ?? 0);
        } catch (err: any) {
            // 👇 error already normalized by interceptor
            setError(err.message || "Failed to fetch orders");
            setOrders([]);
            setCount(0);
        } finally {
            setLoading(false);
        }
    };

    // Fetch once on mount
    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        count,
        loading,
        error,
        refetch: fetchOrders,
    };
};
