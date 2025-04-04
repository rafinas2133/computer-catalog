import { useGetCategoryWithDetails, useGetCategoryByName } from "@/lib/hooks";
import { notFound } from "next/navigation";
import { ProductCard } from "@/ui/product/productCard";

export default async function ProductListPage(props: {
  params: Promise<{
      category: string;
  }>
}) {
  const params = await props.params;
  const categoryName = params.category; 
  
  const linkParsed = categoryName.replace("--", " ");

  const category = await useGetCategoryByName(linkParsed);
  if (!category) {
    notFound(); 
  }

  const categoryDetail = await useGetCategoryWithDetails(category.id);
  if (!categoryDetail) {
    notFound(); 
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="max-w-screen-xl w-full h-full bg-black ring-2 ring-yellow-hunt/50 text-yellow-hunt shadow-2xl shadow-yellow-hunt/50 rounded-xl p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Products in {category.name}
        </h1>
        {categoryDetail?.subCategories.length > 0 && (
          <div className="mb-8">
              {categoryDetail.subCategories.map((subCategory) => (
                <div key={subCategory.id} className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4">{subCategory.name}</h2>
                  <div className="grid grid-rows gap-4">
                    {subCategory.products.map((product) => (
                      <ProductCard 
                      key={product.id}  
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      image={product.imageUrl}
                      link={`/products/${categoryName}/${product.id}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
        {categoryDetail?.products.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-rows gap-4">
              {categoryDetail.products.map((product) => (
                <ProductCard 
                key={product.id}  
                title={product.name}
                description={product.description}
                price={product.price}
                image={product.imageUrl}
                link={`/products/${categoryName}/${product.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


