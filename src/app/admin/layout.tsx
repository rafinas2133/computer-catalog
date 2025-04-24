import SideNav from "@/ui/admin/sidenav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({children}: {children: React.ReactNode}) {

    const session = await auth();
    if (!session) redirect("/login");

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-black">
            <div className="w-full flex-none md:w-64">
                <SideNav /> 
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    )
}