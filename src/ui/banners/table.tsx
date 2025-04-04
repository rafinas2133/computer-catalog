import { UpdateBanner, DeleteBanner } from './button';
import { useGetFilteredBanners } from '@/lib/hooks';
import ImageHolder from '../Image';

export default async function BannerTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const banners = await useGetFilteredBanners(query, currentPage);
  

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {banners?.map((banner) => (
              <div
                key={banner.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                        
                      <ImageHolder
                        src={banner.imageUrl}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${banner.title}'s profile picture`}
                      />
                      <p>{banner.title}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateBanner id={banner.id} />
                    <DeleteBanner id={banner.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Banner
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Link To
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {banners?.map((banner) => (
                <tr
                  key={banner.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <ImageHolder
                        src={banner.imageUrl}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${banner.title}'s profile picture`}
                      />
                      <p>{banner.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-6 w-max rounded bg-gray-100 text-center">{banner.linkProduct} </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateBanner id={banner.id} />
                      <DeleteBanner id={banner.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
