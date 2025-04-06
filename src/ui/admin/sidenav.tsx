'use client';

import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Logo } from '@/utils/image';
import Image from 'next/image';
import NavLinks from './nav-link';
import { signOut } from "next-auth/react";

export default function SideNav() {

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 ">
    <Link
    className="mb-2 flex h-20 items-center justify-center rounded-md bg-yellow-hunt md:h-40"
    href="/"
    >
    <div className="flex items-center justify-center w-full shadow-2xl shadow-yellow-hunt">
        <Image src={Logo} alt="Logo" width={120} height={120} />
    </div>
    </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-yellow-hunt md:block"></div>
        
          <button onClick={handleSignOut} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-yellow-hunt p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
      </div>
    </div>
  );
}
