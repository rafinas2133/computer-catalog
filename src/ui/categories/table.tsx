import { UpdateCategory, DeleteCategory } from './button';
import { useGetFilteredCategories } from '@/lib/hooks';
import { ListStack } from '../ListStack';
import ImageHolder from '../Image';

export default async function CategoryTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await useGetFilteredCategories(query, currentPage);
  

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {categories?.map((category) => (
              <div
                key={category.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                        
                      <ImageHolder
                        src={category.imageUrl?? undefined}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${category.name}'s profile picture`}
                      />
                      <p>{category.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateCategory id={category.id} />
                    <DeleteCategory id={category.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Parent Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Sub Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Product
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {categories?.map((category) => (
                <tr
                  key={category.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <ImageHolder
                        src={category.imageUrl?? undefined}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${category.name}'s profile picture`}
                      />
                      <p>{category.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-6 w-max rounded bg-gray-100 text-center">{category.parent?.name?? "N/A"} </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ListStack items={category.subCategories.map((subCategory) => subCategory.name)} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  <ListStack items={category.products.map((product) => product.name)} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCategory id={category.id} />
                      <DeleteCategory id={category.id} />
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
