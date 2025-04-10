import Link from "next/link";

type FAQCardProps = {
    label: string, 
    href: string
}


export const FAQCard = ({label, href}: FAQCardProps) => {
    return (
        <Link href={href} className="col-span-3 rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-slate-300">
            <div className=" ">
                <h3>{label}</h3>
            </div>
        </Link>
    );
};
