import Form from '@/ui/products/edit-form';
import Breadcrumbs from '@/ui/products/breadcrumbs';
import { notFound } from 'next/navigation';
import { useGetProductById, useGetCategories } from '@/lib/hooks';
 
export default async function Page(props: {
    params: Promise<{
        id: number;
    }>
}) {

    const params = await props.params;
    const id = Number(params.id); 
    const [products, categories] = await Promise.all([
        useGetProductById(id),
        useGetCategories(),
    ]);

    if (!products) {
        return notFound();
    }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/admin/products' },
          {
            label: 'Edit Product',
            href: `/admin/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form products={products} categories={categories} />
    </main>
  );
}