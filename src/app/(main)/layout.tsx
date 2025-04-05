import Link from "next/link";
import { FC, PropsWithChildren } from "react";

const UsersLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <header className="flex justify-between mb-4 px-8 py-4 bg-gray-300">
                <div>Logo</div>
                <div className="flex justify-between">
                    <div className="bg-white p-2 mx-3">
                        <Link href="/users">Usuarios</Link>
                    </div>
                    <div className="bg-white p-2">
                        <Link href="/messages">Mensajes</Link>
                    </div>
                </div>
            </header>
            <main>{children}</main>
            <div>Footer</div>
        </>
    );
};

export default UsersLayout;
