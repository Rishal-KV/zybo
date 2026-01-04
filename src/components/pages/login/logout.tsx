"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        router.push("/login");
    };

    return (
        <div className="flex items-center gap-2">
            <Link href="/profile" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                <Image
                    src="/icons/UserCircle.png"
                    alt="Profile"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                />
            </Link>
            <div onClick={handleLogout}>
                <span className="text-white cursor-pointer text-[15px] font-semibold">Logut</span>
            </div>
        </div>
    );
};

export default LogoutButton;
