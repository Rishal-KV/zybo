"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

const LoginButton = () => {
    const pathname = usePathname();

    if (pathname === "/login") {
        return null;
    }

    return (
        <Link href="/login">
            <Button className="flex items-center gap-2 bg-white text-black hover:bg-gray-200">
                <LogIn className="w-4 h-4" />
                Login
            </Button>
        </Link>
    );
};

export default LoginButton;
