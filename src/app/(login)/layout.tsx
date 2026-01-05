"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/common/navBar";
import Footer from "@/components/common/footer";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            // 🔒 Already authenticated → redirect to home
            router.replace("/");
        } else {
            // ❌ Not authenticated → allow login page
            setCheckingAuth(false);
        }
    }, [router]);

    // ⛔ Prevent flicker
    if (checkingAuth) return null;

    return (
        <div className="pt-20">
            <NavBar />
            {children}
            <Footer />
        </div>
    );
};

export default LoginLayout;
