import Image from "next/image";
import Link from 'next/link';
import { facebookIcon, twitterIcon, instagramIcon } from "@/utils/image";

export default function Footer() {

    const sosmed = [
        { name: "Instagram", link: "https://instagram.com", icon: instagramIcon },
        { name: "Facebook", link: "https://facebook.com", icon: facebookIcon },
        { name: "Twitter", link: "https://twitter.com", icon: twitterIcon },
    ];

    return (
      <footer className="w-full bg-white text-black shadow shadow-black py-8">
        <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-4 md:gap-0 px-4">
          {/* Social Media */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <ul className="flex gap-4">
                {sosmed.map((sosmed, index) => (
                    <li key={index}>
                    <Link href={sosmed.link}>
                        <Image src={sosmed.icon} alt={sosmed.name} width={32} height={32} />
                    </Link>
                    </li>
                ))}
            </ul>
          </div>
  
          {/* Logo */}
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <h1 className="w-full text-2xl font-bold top-10">TokoKami</h1>
          </div>
  
          {/* Profile Info */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Our Store</h3>
            <p>Address: Jl. Contoh Alamat No.123, Jakarta</p>
            <p>Open Hours: Mon-Sat 9:00 AM - 6:00 PM</p>
            <p>Phone: +62 123 4567 890</p>
            <p>Email: info@tokokami.com</p>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} TokoKami. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  