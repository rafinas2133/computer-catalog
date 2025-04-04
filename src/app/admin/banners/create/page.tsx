import Form from '@/ui/banners/create-form';
import Breadcrumbs from '@/ui/banners/breadcrumbs';
import { useGetProducts } from '@/lib/hooks'; 
 
export default async function Page() {
  const products = await useGetProducts();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Banners', href: '/admin/banners' },
          {
            label: 'Create Banners',
            href: '/admin/banners/create',
            active: true,
          },
        ]}
      />
      <Form products={products} />
    </main>
  );
}