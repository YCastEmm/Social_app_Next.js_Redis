"use client"

import { LinkType } from "@/types/link.types"
import { useRouter, usePathname } from "next/navigation"

type MenuProps = {
    links: LinkType[]
}

const Menu = ({ links }: MenuProps) => {
    const router = useRouter()
    const pathname = usePathname()

    const onGoToLink = (href: string) => {
        router.push(href)
        router.refresh()
    }

    return (
        <nav className="flex flex-col w-full px-4 py-6 bg-white rounded-xl shadow-md gap-4">
        <ul className="flex flex-col gap-2">
            {links &&
            links.map((link, index) => {
                const isActive = pathname === link.href
                return (
                <li key={index}>
                    <button
                    onClick={() => onGoToLink(link.href)}
                    className={`w-full text-left px-4 py-2 font-medium rounded-lg transition-colors
                        ${isActive ? "bg-indigo-100 text-indigo-900 font-semibold" : "text-indigo-700 hover:bg-indigo-50"}`}
                    >
                    {link.title}
                    </button>
                </li>
                )
            })}
        </ul>

        <button className="button-primary uppercase w-full shadow-md">Publicar</button>
        </nav>
    )
}

export default Menu
