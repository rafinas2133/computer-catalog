import Image from 'next/image';
import Link from 'next/link';
import { ErrorImage } from '@/utils/image';


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
        <Link href={link} className="w-full h-full p-2 flex flex-col justify-start items-center grow gap-2 border">
            <div className="w-full h-48 relative">
            <Image src={image?? ErrorImage} alt={description} layout="fill" objectFit="cover" className="rounded-xl" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-center">{description}</p>
            <div className='flex items-end grow'>
                <p className="text-sm font-semibold">Rp {price}</p>
            </div>
        </Link>
    );
}