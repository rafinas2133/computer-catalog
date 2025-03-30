const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ImageSkeleton() {
  return (
    <div
      className={`${shimmer} h-full relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex h-full p-4">
        <div className="w-full flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
          <div className="h-[90%] w-[90%] rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}