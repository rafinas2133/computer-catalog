import { useGetProductById} from "@/lib/hooks";
import { notFound } from "next/navigation";
import { ProductDetailCard } from "@/ui/product/ProductDetailCard";

export default async function ProductDetailPage(props: {
  params: Promise<{
    category: string;
    product: string;
  }>;
}) {
    const params = await props.params;
    const { product } = params;

    const products = await useGetProductById(Number(product));
    if (!products) {
    notFound();
    }
    

    return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-8 ">
        <ProductDetailCard {...products} />
    </div>
    );
}
