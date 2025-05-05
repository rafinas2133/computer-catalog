import { RecomItemCard } from "./RecomItemCard";
import { useGetProductsRandom } from "@/lib/hooks";


export async function RecomItem() {

  const products = await useGetProductsRandom()

  return (
    <div className="w-full h-max flex flex-col justify-center">
      <div className="md:w-full w-xs h-full max-w-screen-xl mx-auto rounded-xl p-2 bg-yellow-hunt shadow-2xl shadow-yellow-hunt/50">
        <div className="bg-yellow-hunt text-2xl rounded-t-xl pb-2 text-black text-center font-bold">
          Rekomendasi Buat Kamu nih!
        </div>
        <div className="w-full h-full bg-white justify-center grid md:grid-cols-6 grid-cols-1">
          {products.map((product, index) => (
            <div key={product.id} className={ `${index === 0 ? "block md:hidden" : "hidden md:block"}`}>
              <RecomItemCard
                title={product.name}
                description={
                  product.description.length > 50
                    ? product.description.substring(0, 50) + '...'
                    : product.description
                }
                link={`/products/${product.category.name}/${product.id}`}
                price={product.price}
                image={product.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  }
  