import { NewItemCard } from "./NewItemCard";
import { useGetProducts } from "@/lib/hooks";


export async function NewItem() {

  const products = await useGetProducts()

  return (
    <div className="w-full h-max flex flex-col justify-center">
      <div className="md:w-full w-xs h-full max-w-screen-xl mx-auto rounded-xl p-2 bg-black shadow-md shadow-black/50">
        <div className="bg-black text-2xl rounded-t-xl pb-2 text-white text-center">
          Yang Baru Nih
        </div>
        <div className="w-full h-full bg-white justify-center grid md:grid-cols-6 grid-cols-1">
          {products.slice(0, 7).map((product, index) => (
            <div key={product.id} className={ `${index === 0 ? "block md:hidden" : "hidden md:block"}`}>
              <NewItemCard
                title={product.name}
                description={product.description}
                link={`/products/${product.category.name}/${product.id}`}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  }
  