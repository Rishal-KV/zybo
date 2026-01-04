"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/common/navBar";
import Footer from "@/components/common/footer";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            router.replace("/login");
        } else {
            setCheckingAuth(false);
        }
    }, [router]);

    if (checkingAuth) return null;

    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
};

export default ShopLayout;
