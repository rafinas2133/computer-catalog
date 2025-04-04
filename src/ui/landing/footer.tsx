import Image from "next/image";
import Link from 'next/link';
import { facebookIcon, twitterIcon, instagramIcon, Logo } from "@/utils/image";

export default function Footer() {

    const sosmed = [
        { name: "Instagram", link: "https://instagram.com", icon: instagramIcon },
        { name: "Facebook", link: "https://facebook.com", icon: facebookIcon },
        { name: "Twitter", link: "https://twitter.com", icon: twitterIcon },
    ];

    return (
      <footer className="w-full bg-black text-yellow-hunt shadow shadow-yellow-hunt/50 py-8">
        <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-4 md:gap-0 px-4">
          {/* Social Media */}
          <div className="w-max flex flex-col gap-4">
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
          <div className="w-full md:w-1/3 flex grow justify-center items-center h-full text-4xl font-bold">
            Tech
            <Image src={Logo} alt="Logo Toko" width={192} height={192} className="w-auto h-auto" />
            Tonic
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
        <div className="mt-8 border-t border-yellow-hunt pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} TokoKami. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  