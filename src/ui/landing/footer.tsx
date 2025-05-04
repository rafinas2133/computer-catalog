import Image from "next/image";
import Link from 'next/link';
import { facebookIcon, tiktokIcon, instagramIcon, Logo } from "@/utils/image";

export default function Footer() {

    const sosmed = [
        { name: "Instagram", link: "https://www.instagram.com/techtonic.komputer?igsh=MWlkZWg5Zng1ODRyaw==", icon: instagramIcon },
        { name: "Facebook", link: "https://www.facebook.com/share/1AGyJh4Wzp/", icon: facebookIcon },
        { name: "TikTok", link: "https://www.tiktok.com/@techtonic.komputer?_t=ZS-8w49MYtODMG&_r=1", icon: tiktokIcon },
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
                    <Link href={sosmed.link} target="_blank">
                        <Image src={sosmed.icon} alt={sosmed.name} width={32} height={32} className="rounded-sm"/>
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
            <h3 className="text-lg font-semibold">Techtonic Komputer</h3>
            <p>Address: Jl. Merapi No.14, Kepanjen Lor, Kec. Kepanjen Kidul, Kota Blitar</p>
            <p>Open Hours: Mon-Sun 9:00 AM - 8:00 PM (Friday Closed)</p>
            <p>Phone: +62 857 9050 8300</p>
            <p>Email: techtonicpoint@gmail.com</p>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="mt-8 border-t border-yellow-hunt pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Techtonic. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  