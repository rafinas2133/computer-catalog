import { CategoryCard } from "./categoriesCard";

export function CategoriesList() {

    const list = [
        {
            title: "Category 1",
            image: null,
            link: "/category1",
        },
        {
            title: "Category 2",
            image: null,
            link: "/category2",
        },
        {
            title: "Category 3",
            image: null,
            link: "/category3",
        },
        {
            title: "Category 4",
            image: null,
            link: "/category4",
        },
        {
            title: "Category 5",
            image: null,
            link: "/category5",
        },
        {
            title: "Category 6",
            image: null,
            link: "/category3",
        },
        {
            title: "Category 7",
            image: null,
            link: "/category4",
        },
        {
            title: "Category 8",
            image: null,
            link: "/category5",
        },
        {
            title: "Category 1",
            image: null,
            link: "/category1",
        },
        {
            title: "Category 2",
            image: null,
            link: "/category2",
        },
        {
            title: "Category 3",
            image: null,
            link: "/category3",
        },
        {
            title: "Category 4",
            image: null,
            link: "/category4",
        },
        {
            title: "Category 5",
            image: null,
            link: "/category5",
        },
        {
            title: "Category 6",
            image: null,
            link: "/category3",
        },
        {
            title: "Category 7",
            image: null,
            link: "/category4",
        },
        {
            title: "Category 8",
            image: null,
            link: "/category5",
        },
    ]

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="md:w-full w-xs h-full max-w-screen-xl md:mx-auto rounded-xl bg-white shadow-md shadow-black/50">
        <div className="bg-red-600 text-2xl r rounded-tl-xl rounded-br-full p-2 max-w-2xs text-white">Shop by Categories</div>
        <div className="w-full h-full flex flex-wrap justify-center py-4 gap-4">
            {list.map((category, i) => {
                return (
                    (category.image) ?
                        <CategoryCard
                        key={i}
                        title={category.title}
                        image={category.image}
                        link={category.link}
                    />
                    :
                        <CategoryCard
                        key={i}
                        title={category.title}
                        link={category.link}
                    />
                )
            })}

        </div>
      </div>
    </div>
  );
}