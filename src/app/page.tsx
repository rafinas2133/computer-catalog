import Navbar from "@/ui/landing/navbar/navbar";
import { Banner } from "@/ui/landing/banner";
import { CategoriesList } from "@/ui/landing/categories/categories";
import { NewItem } from "@/ui/landing/new/newItem";
import { RecomItem } from "@/ui/landing/recommended/recomItem";
import Footer from "@/ui/landing/footer"; 

export default function Home() {
  return (
    <>
      <header className="w-full h-full bg-black row-start-1 flex justify-center z-50">
        <Navbar />
      </header>
      <main className="w-full h-full flex flex-col gap-20 justify-center">
        <Banner /> 
        <CategoriesList/>
        <NewItem/>
        <RecomItem/>
      </main>
      <footer className="w-full h-full flex flex-col gap-20 justify-center mt-20">
        <Footer/> 
      </footer>
    </>
  );
}
