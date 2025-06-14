"use client";

import authApi from "@/services/auth/auth.api";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavbarProps = {
    loggedUsername?: string | null;
};

const Navbar = ({ loggedUsername }: NavbarProps) => {
    const router = useRouter();

    const logout = async () => {
        await authApi.logout();
        router.push("/login");
        router.refresh();
    };

    return (
        <header className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md mb-4">
            <nav className="flex items-center justify-between max-w-screen-xl mx-auto text-white px-6 py-4">
                <Link href="/explore" className="flex items-center gap-2 cursor-pointer">
                    <img src="/logo.png" alt="Logo SocialApp" className="h-10 w-auto" />
                    <span className="text-white ml-3 font-semibold text-3xl">SocialApp</span>
                </Link>

                {loggedUsername && (
                    <button className="button-secondary" onClick={logout}>
                        Cerrar sesión
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
