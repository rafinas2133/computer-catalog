import Image from 'next/image';
import Link from 'next/link';
import { bannerErrorImage } from '@/utils/image';


export function NewItemCard (
    { image, 
        title, 
        description, 
        link, 
        price
    }:{
        image?: string,
        title: string,
        description: string,
        link: string
        price: number
    }) {
    return (
        <Link href={link} className="w-[180px] h-max p-2 flex flex-col justify-center items-center gap-2">
            <div className="w-full h-48 relative">
            <Image src={image?? bannerErrorImage} alt={description} layout="fill" objectFit="cover" className="rounded-xl" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-center">{description}</p>
            <p className="text-sm font-semibold">Rp {price}</p>
        </Link>
    );
}