import Form from '@/ui/categories/create-form';
import Breadcrumbs from '@/ui/categories/breadcrumbs';
import { useGetCategories } from '@/lib/hooks'; 
 
export default async function Page() {
  const categories = await useGetCategories();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/admin/categories' },
          {
            label: 'Create Categories',
            href: '/admin/categories/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}