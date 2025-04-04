import Form from '@/ui/products/create-form';
import Breadcrumbs from '@/ui/banners/breadcrumbs';
import { useGetCategories } from '@/lib/hooks'; 
 
export default async function Page() {
  const categories = await useGetCategories();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/admin/products' },
          {
            label: 'Create Products',
            href: '/admin/products/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}