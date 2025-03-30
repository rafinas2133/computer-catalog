import Navbar from "@/ui/landing/navbar/navbar"
import Footer from "@/ui/landing/footer"

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
            <header className="w-full h-full bg-white row-start-1 flex justify-center z-50">
            <Navbar />
            </header>
            <main className="w-full h-full flex flex-row gap-20 justify-center">
            {children}
            </main>
            <footer className="w-full h-full flex flex-col gap-20 justify-center mt-20">
                <Footer/> 
            </footer>

        </>
    )
}