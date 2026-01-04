import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PurchasedItem {
    orderId: string;
    productName: string;
    color: string;
    size: string;
    image: string;
    price: number;
    quantity: number;
    purchasedAt: string;
}

interface OrderStore {
    orders: PurchasedItem[];
    hydrated: boolean;
    addOrder: (items: PurchasedItem[]) => void;
    clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
    persist(
        (set) => ({
            orders: [],
            hydrated: false,

            addOrder: (items) =>
                set((state) => ({
                    orders: [...state.orders, ...items],
                })),

            clearOrders: () => set({ orders: [] }),
        }),
        {
            name: "order-storage",
            onRehydrateStorage: () => (state) => {
                if (state) state.hydrated = true;
            },
        }
    )
);
