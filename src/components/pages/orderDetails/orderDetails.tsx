"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/userOrderStore";

const OrderSuccess = () => {
    const router = useRouter();

    const { orders, hydrated, clearOrders } = useOrderStore();

    const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;
    useEffect(() => {
        const handleRouteChange = () => {
            clearOrders();
        };

        window.addEventListener("beforeunload", handleRouteChange);

        return () => {
            window.removeEventListener("beforeunload", handleRouteChange);
        };
    }, [clearOrders]);


    /**
     * 🔒 Redirect ONLY after hydration
  

    /**
     * ⛔ BLOCK RENDER until hydration finishes
     */
    if (!hydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    /**
     * ⛔ BLOCK RENDER if redirecting
     */
    if (!latestOrder) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4">
            <div className="w-full max-w-md text-center text-white">

                <div className="flex justify-center mb-6">
                    <Image src="/logo.png" alt="Brand Logo" width={60} height={60} />
                </div>

                <h1 className="text-2xl font-semibold mb-2">
                    Successfully Ordered!
                </h1>

                <p className="text-sm text-gray-400 mb-8">
                    {new Date(latestOrder.purchasedAt).toLocaleString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </p>

                <div className="flex items-center gap-4 rounded-xl bg-[#282828] p-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                            src={latestOrder.image}
                            alt={latestOrder.productName}
                            fill
                            sizes="80px"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col w-full gap-4">
                        <div className="flex justify-between text-left">
                            <h2 className="text-sm font-semibold">
                                {latestOrder.productName}
                            </h2>
                            <p className="text-sm font-semibold">
                                ₹{latestOrder.price}
                            </p>

                        </div>
                        <div className="flex justify-between">
                            <p className="text-xs text-gray-400 mt-1">
                                {latestOrder.color} • UK {latestOrder.size}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;
