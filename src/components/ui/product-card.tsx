"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { usePurchaseProduct } from "@/hooks/createOrder";
import { useOrderStore } from "@/store/userOrderStore";

/* ================= TYPES ================= */

interface Size {
    size_id: number;
    size_name: string;
    status: boolean;
    price: number;
    variation_product_id: string;
}

interface VariationColor {
    color_id: number;
    color_name: string;
    color_images: string[];
    status: boolean;
    sizes: Size[];
}

interface ProductImage {
    product_image: string;
}

interface Product {
    id: string;
    name: string;
    product_images: ProductImage[];
    variations_exist: boolean;
    variation_colors: VariationColor[];
    sale_price: number;
    mrp: number;
    new: boolean;
    discount: number;
    out_of_stock: boolean;
    slug: string;
}

interface ProductCardProps {
    product: Product;
}

/* ================= HELPERS ================= */

const parseProductName = (name: string) => {
    const parts = name.split(" - ");
    return {
        productName: parts[0] || name,
        color: parts[1] || "",
        size: parts[2] || "",
    };
};

/* ================= COMPONENT ================= */

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter();
    console.log(product, "hello");

    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const infoWrapperRef = useRef<HTMLDivElement>(null);
    const sizeRef = useRef<HTMLDivElement>(null);
    const colorRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const [selectedColor, setSelectedColor] =
        useState<VariationColor | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const [currentImage, setCurrentImage] = useState(
        product.product_images[0]?.product_image || ""
    );

    const [canHover, setCanHover] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCanHover(window.matchMedia("(hover: hover)").matches);
        }
    }, []);

    const { purchaseProduct, loading } = usePurchaseProduct();
    const addOrder = useOrderStore((state) => state.addOrder);

    /* ================= HANDLERS ================= */

    const handleColorChange = (colorName: string) => {
        const color = product.variation_colors.find(
            (vc) => vc.color_name === colorName
        );
        if (!color) return;

        setSelectedColor(color);
        setSelectedSize(null);

        if (color.color_images.length > 0) {
            setCurrentImage(color.color_images[0]);
        }
    };

    const handleSizeChange = (sizeName: string) => {
        setSelectedSize(sizeName);
    };

    const selectedVariation = selectedColor?.sizes.find(
        (s) => s.size_name === selectedSize
    );

    /* ================= BUY NOW ================= */

    const handleBuyNow = async () => {
        if (product.out_of_stock) {
            toast.error("This product is currently out of stock");
            return;
        }

        let response: any;

        if (product.variations_exist) {
            if (!selectedColor || !selectedSize || !selectedVariation) {
                toast.error("Please select color and size");
                return;
            }

            response = await purchaseProduct({
                variation_product_id: selectedVariation.variation_product_id,
            });
        } else {
            response = await purchaseProduct({
                product_id: product.id,
            });
        }

        if (!response?.order?.order_details) {
            toast.error("Something went wrong while creating order");
            return;
        }

        const { order } = response;
        console.log({order})

        const items = order.order_details.map((item: any) => {
            const { productName, color, size } = parseProductName(item.product_name);

            return {
                orderId: order.id,
                productName,
                color,
                size,
                image: item.product_image,
                price: item.price,
                quantity: item.quantity,
                purchasedAt: order.created,
            };
        });

        addOrder(items);
        router.replace("/order-success");
    };

    /* ================= DERIVED DATA ================= */

    const availableSizes = selectedColor
        ? selectedColor.sizes.map((s) => s.size_name)
        : Array.from(
            new Set(
                product.variation_colors.flatMap((vc) =>
                    vc.sizes.map((s) => s.size_name)
                )
            )
        );

    const colors = product.variation_colors.map((vc) => vc.color_name);

    /* ================= GSAP (DESKTOP ONLY) ================= */

    useGSAP(
        () => {
            if (!canHover) return;

            const tl = gsap.timeline({
                paused: true,
                defaults: { ease: "power3.out", duration: 0.5 },
            });

            tl.to(imageRef.current, { y: -30 }, 0);
            tl.to(infoWrapperRef.current, { y: -20 }, 0);
            tl.to(sizeRef.current, { autoAlpha: 1, duration: 0.2 }, 0.1);
            tl.to(colorRef.current, { autoAlpha: 1 }, 0.2);
            tl.to(btnRef.current, { autoAlpha: 1 }, 0.3);

            const container = containerRef.current;
            const onEnter = () => tl.play();
            const onLeave = () => tl.reverse();

            container?.addEventListener("mouseenter", onEnter);
            container?.addEventListener("mouseleave", onLeave);

            return () => {
                container?.removeEventListener("mouseenter", onEnter);
                container?.removeEventListener("mouseleave", onLeave);
            };
        },
        { scope: containerRef, dependencies: [canHover] }
    );

    /* ================= JSX ================= */

    return (
        <div
            ref={containerRef}
            className="bg-[#232323] w-full overflow-hidden flex flex-col cursor-pointer h-auto md:h-[400px]"
        >
            {/* IMAGE */}
            <div
                ref={imageRef}
                className="w-full h-[240px] sm:h-[250px] md:h-[260px] flex items-center justify-center"
            >
                <Image
                    src={currentImage || "/placeholder.png"}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* INFO */}
            <div
                ref={infoWrapperRef}
                className="w-full px-3 py-3 md:px-6 md:py-6 flex flex-col bg-[#232323] text-left md:text-center"
            >
                <div className="flex flex-col gap-3 md:gap-4">
                    {/* <h1 className="text-white text-[12px] md:text-sm font-semibold">
                        {product.name}
                    </h1> */}
                    {/* SIZE */}
                    <div
                        ref={sizeRef}
                        className={`flex justify-start md:justify-center ${canHover ? "opacity-0 invisible md:flex" : "opacity-100 visible"
                            }`}
                    >
                        <div className="flex gap-2 items-center flex-wrap">
                            <span className="text-white text-[10px] md:text-xs font-semibold">
                                Size:
                            </span>
                            {availableSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeChange(size)}
                                    disabled={!selectedColor}
                                    className={`w-6 h-6 md:w-7 md:h-7 rounded-[4px] text-[11px] md:text-sm font-semibold transition ${selectedSize === size
                                        ? "bg-[#372224] text-white"
                                        : selectedColor
                                        ? "bg-gray-100 text-gray-700"
                                        : "bg-gray-400 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* COLOR */}
                    <div
                        ref={colorRef}
                        className={`flex justify-start md:justify-center ${canHover ? "opacity-0 invisible md:flex" : "opacity-100 visible"
                            }`}
                    >
                        <div className="flex gap-2 items-center">
                            <span className="text-white text-[10px] md:text-xs font-semibold">
                                Color:
                            </span>
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => handleColorChange(color)}
                                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full transition ${selectedColor?.color_name === color
                                        ? "ring-2 ring-black ring-offset-2"
                                        : "ring-1 ring-gray-300"
                                        }`}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* BUTTON */}
                    <div className="flex justify-start md:justify-center">
                        <button
                            ref={btnRef}
                            onClick={handleBuyNow}
                            disabled={loading}
                            className={`bg-white text-black font-semibold py-2.5 md:py-3 rounded-[5px]
                text-[12px] md:text-sm uppercase w-full md:w-[150px]
                disabled:opacity-60 ${canHover
                                    ? "opacity-0 invisible md:block"
                                    : "opacity-100 visible"
                                }`}
                        >
                            {loading ? "Processing..." : "Buy Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
