
"use client";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "./login-button";
import LogoutButton from "../pages/login/logout";
import { useEffect, useState } from "react";
const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        typeof window !== "undefined" &&
            !!localStorage.getItem("accessToken") &&
            setIsAuthenticated(true);
    }, []);
    return (
        <div className="w-full bg-[var(--secondary-color)] sticky top-0 z-50">
            <div className="container mx-auto py-2 px-4">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Image className="w-16 h-16 object-contain" src="/logo.png" alt="Logo" width={100} height={100} />
                    </Link>

                    <div>
                        {isAuthenticated ? (
                            <LogoutButton />

                        ) : (
                            <LoginButton />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NavBar;