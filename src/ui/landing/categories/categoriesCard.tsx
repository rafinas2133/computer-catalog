import Link from "next/link";
import { bannerErrorImage } from "@/utils/image";
import Image from "next/image";

export function CategoryCard({
  title,
  image,
  link,
}: {
  title: string;
  image?: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="w-32 h-32 flex flex-col justify-center items-center rounded-lg hover:shadow-lg transition duration-300 group"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden group-hover:animate-breathe">
        <Image
          src={image ?? bannerErrorImage}
          alt={title}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-md font-semibold mt-4">{title}</h3>
    </Link>
  );
}
