import NavLinks from "./nav-link"

export default function Navbar() {
    return (
        <nav className="w-full h-full flex justify-center items-center font-black text-lg px-20 py-4 z-50">
            <NavLinks />
        </nav>
    )
}