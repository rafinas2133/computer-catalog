import Form from '@/ui/categories/edit-form';
import Breadcrumbs from '@/ui/categories/breadcrumbs';
import { notFound } from 'next/navigation';
import { useGetCategoryById, useGetCategories } from '@/lib/hooks';
 
export default async function Page(props: {
    params: Promise<{
        id: number;
    }>
}) {

    const params = await props.params;
    const id = Number(params.id); 
    const [category, categories] = await Promise.all([
        useGetCategoryById(id),
        useGetCategories(),
    ]);

    if (!category) {
        return notFound();
    }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/admin/categories' },
          {
            label: 'Edit Category',
            href: `/admin/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form category={category} categories={categories} />
    </main>
  );
}