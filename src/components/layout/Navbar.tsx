import Link from "next/link"

const Navbar = () => { 
    
    return      <header className="w-full">
                    <nav className="w-full bg-blue-500 text-white p-4 mb-2">
                        <div>
                            <Link href="/explore">
                                <div className="px-4">
                                    Logo
                                </div>
                            </Link>
                        </div>
                    </nav>
                </header>

}

export default Navbar