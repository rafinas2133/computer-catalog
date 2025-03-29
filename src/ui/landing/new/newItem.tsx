import { NewItemCard } from "./NewItemCard";


export function NewItem() {
    return (
      <div className="w-full h-max flex flex-col justify-center">
        <div className="md:w-full w-xs h-full max-w-screen-xl mx-auto rounded-xl p-2 bg-red-600 shadow-md shadow-black/50">
          <div className="bg-red-600 text-2xl rounded-t-xl pb-2 text-white text-center">Yang Baru nih</div>
          <div className="w-full h-full bg-white px-2 py-4 flex flex-wrap justify-center gap-4">
            <NewItemCard
                title="Title 1"
                description="Description 1"
                link="#"
                price={100000}
            />
            <NewItemCard
                title="Title 1"
                description="Description 1"
                link="#"
                price={100000}
            />
            <NewItemCard
                title="Title 1"
                description="Description 1"
                link="#"
                price={100000}
            />
                        <NewItemCard
                title="Title 1"
                description="Description 1"
                link="#"
                price={100000}
            />
                        <NewItemCard
                title="Title 1"
                description="Description 1"
                link="#"
                price={100000}
            />
                                    <NewItemCard
                title="Title 1"
                description="Description 1"
                link="#"
                price={100000}
            />
            
          </div>
        </div>
      </div>
    );
  }
  