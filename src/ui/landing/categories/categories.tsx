import { CategoryCard } from "./categoriesCard";
import { useGetCategories } from "@/lib/hooks";

export async function CategoriesList() {

    const categories = await useGetCategories();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="md:w-full w-xs h-full max-w-screen-xl md:mx-auto rounded-xl bg-white shadow-2xl shadow-yellow-hunt/50">
        <div className="bg-yellow-hunt text-2xl r rounded-tl-xl rounded-br-full p-2 max-w-2xs text-black font-bold">Shop by Categories</div>
        <div className="w-full h-full flex flex-wrap justify-center py-4 gap-4">
            {categories.map((category, i) => {
                return (
                    (category.imageUrl) ?
                        <CategoryCard
                        key={i}
                        title={category.name}
                        image={category.imageUrl}
                        link={category.name}
                    />
                    :
                        <CategoryCard
                        key={i}
                        title={category.name}
                        link={category.name}
                    />
                )
            })}

        </div>
      </div>
    </div>
  );
}