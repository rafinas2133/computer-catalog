'use server';

import { Logo } from '@/utils/image';
import LoginForm from '@/ui/login/login-form';
import { Suspense } from 'react';
import Image from 'next/image';
import { executeAction } from '@/lib/executeAction';
import { signIn } from '@/lib/auth';
 
export default async function LoginPage() {

  async function loginAction(formData: FormData) {
    'use server';
    await executeAction({
      actionFn: async () => {
        await signIn('credentials', formData)
      }
    })
  }

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Image src={Logo} alt="Logo Toko" width={192} height={192} className="w-auto h-auto" />
          </div>
        </div>
        <Suspense>
          <LoginForm action={loginAction} />
        </Suspense>
      </div>
    </main>
  );
}