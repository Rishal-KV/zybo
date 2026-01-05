import ProductCard from "@/components/ui/product-card";

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
async function getNewProducts(): Promise<Product[]> {
    try {
        const res = await fetch("https://skilltestnextjs.evidam.zybotechlab.com/api/new-products/", {
            next: { revalidate: 60 }, // ISR with 60 seconds
        });

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

const Page = async () => {
    const products = await getNewProducts();
    

    return (
        <div className="bg-[#171717]">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-white">Men’s Jordan Shoes</h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {products.map((product) => {
                    const uniqueSizes = product.variation_colors ? Array.from(
                        new Set(
                            product.variation_colors.flatMap((vc) =>
                                vc.sizes.map((s) => s.size_name)
                            )
                        )
                    ) : [];

                    return (
                        <div key={product.id} className="basis-[calc(50%-0.75rem)] sm:basis-[calc(50%-1.5rem)] lg:basis-[calc(33.33%-1.5rem)] xl:basis-[calc(25%-1.5rem)]"
                        >
                            <ProductCard
                                product={product}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
        </div>
    );
};

export default Page;
