"use client";

import Image from "next/image";
import { useUserOrders } from "@/hooks/useOrders";

/* ================= PAGE ================= */

const Profile = () => {
    const parseProductName = (productName: string) => {
        const parts = productName.split(" - ");

        return {
            name: parts[0] || productName,
            color: parts[1] || "",
            size: parts[2] || "",
        };
    };

    const { orders, loading, error } = useUserOrders();

    return (
        <div className="bg-[#171717]">  
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-[24px] md:text-[40px] font-semibold  text-white">
                My Orders
            </h1>

            <div className="flex flex-col min-h-[60vh] mt-5 gap-4">

                {/* LOADING */}
                {loading && (
                    <p className="text-gray-400">Loading orders...</p>
                )}

                {/* ERROR */}
                {error && (
                    <p className="text-red-500">{error}</p>
                )}

                {/* EMPTY */}
                {!loading && !error && orders.length === 0 && (
                    <p className="text-gray-400">
                        You haven’t placed any orders yet.
                    </p>
                )}

                {/* ORDERS */}
                {!loading && !error &&
                    orders.map((order) => {
                        const { name, color, size } = parseProductName(
                            order.product_name
                        );

                        return (
                            <div
                                key={order.order_id}
                                className="flex  md:flex-row w-full md:w-[500px] md:gap-4 gap-0 rounded-xl bg-[#282828] px-4 py-3 overflow-hidden"
                            >
                                {/* IMAGE */}

                                <div >
                                    <div className="relative w-25 h-25 md:w-16 md:h-16 shrink-0 rounded-lg overflow-hidden">
                                        <Image
                                            src={order.product_image}
                                            alt={name}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <p className="text-[11px] md:hidden block text-gray-500 mt-2">
                                        {order.created_date}
                                    </p>
                                </div>

                                {/* CONTENT */}
                                <div className="flex flex-col min-w-0 flex-1">
                                    {/* MOBILE: COLUMN LAYOUT */}
                                    <div className="md:hidden flex flex-col gap-3">
                                        <p className="text-sm font-medium text-white truncate">
                                            {name}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">
                                            UK {size}, {color}
                                        </p>
                                        <div className="flex items-center  gap-3">
                                            <p className="text-[15px] font-semibold text-white">
                                                ₹{order.product_price}
                                            </p>
                                            <p className="text-xs text-gray-500 line-through">
                                                ₹{order.product_mrp}
                                            </p>
                                        </div>
                                    </div>

                                    {/* DESKTOP: ROW LAYOUT */}
                                    <div className="hidden md:flex justify-between flex-row gap-4">
                                        {/* LEFT TEXT */}
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">
                                                {name}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1 truncate">
                                                UK {size}, {color}
                                            </p>
                                        </div>

                                        {/* PRICE */}
                                        <div className="flex justify-center gap-2 shrink-0">
                                            <p className="text-[15px] font-semibold text-white">
                                                ₹{order.product_price}
                                            </p>
                                            <p className="text-xs md:mt-1 text-gray-500 line-through">
                                                ₹{order.product_mrp}
                                            </p>
                                        </div>
                                    </div>

                                    {/* DATE - DESKTOP ONLY */}
                                    <p className="text-[11px] md:block hidden text-gray-500 mt-2">
                                        {order.created_date}
                                    </p>
                                </div>

                            </div>




                        );
                    })}
            </div>
        </div>
        </div>
    );
};

export default Profile;
