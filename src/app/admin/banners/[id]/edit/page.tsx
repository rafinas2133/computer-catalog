import Form from '@/ui/banners/edit-form';
import Breadcrumbs from '@/ui/banners/breadcrumbs';
import { notFound } from 'next/navigation';
import { useGetBannersById, useGetProducts } from '@/lib/hooks';
 
export default async function Page(props: {
    params: Promise<{
        id: number;
    }>
}) {

    const params = await props.params;
    const id = Number(params.id); 
    const [banners, products] = await Promise.all([
        useGetBannersById(id),
        useGetProducts(),
    ]);

    if (!banners) {
        return notFound();
    }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Banners', href: '/dashboard/banners' },
          {
            label: 'Edit Banner',
            href: `/dashboard/banners/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form banners={banners} products={products} />
    </main>
  );
}