import { useState } from "react";
import axiosInstance from "../lib/config/axios";

interface PurchaseProductRequest {
    product_id?: string;
    variation_product_id?: string;
}

interface PurchaseProductResponse {
    message: string;
    order_id: string;
    status: string;
}

interface UsePurchaseProductResult {
    purchaseProduct: (
        data: PurchaseProductRequest
    ) => Promise<PurchaseProductResponse | null>;
    loading: boolean;
    error: string | null;
    data: PurchaseProductResponse | null;
}

export const usePurchaseProduct = (): UsePurchaseProductResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PurchaseProductResponse | null>(null);

    const purchaseProduct = async (
        requestData: PurchaseProductRequest
    ): Promise<PurchaseProductResponse | null> => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            // Validation: send either product_id OR variation_product_id
            if (
                (!requestData.product_id && !requestData.variation_product_id) ||
                (requestData.product_id && requestData.variation_product_id)
            ) {
                throw new Error(
                    "Send either product_id or variation_product_id, but not both."
                );
            }

            const response = await axiosInstance.post<PurchaseProductResponse>(
                "/purchase-product/",
                requestData
            );

            setData(response.data);
            return response.data;
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to purchase product.";
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { purchaseProduct, loading, error, data };
};
