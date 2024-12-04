import Link from 'next/link'

import { SignInFormElement } from './elements/sign-in-form'
import { LogIn, PencilRuler } from 'lucide-react'

import { FC } from 'react'

import { EStaticImage } from '@/app/shared/interface/asset.interface'

// interface
interface ISignModuleProps {}

// component
const SignModule: FC<Readonly<ISignModuleProps>> = () => {
  // return
  return (
    <main
      className={'flex h-screen w-screen items-center justify-center overflow-hidden rounded-small p-4 sm:p-6 lg:p-8'}
      style={{
        backgroundImage: `url(${EStaticImage.SIGN_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={'absolute right-10 top-10'}>
        <div className={'flex items-center gap-2'}>
          <PencilRuler size={18} />
          <h1 className={'text-xl font-medium text-white'}>CRM</h1>
        </div>
      </div>

      <div className={'absolute bottom-10 right-10 hidden md:block'}>
        <p className={'max-w-xl text-center text-small text-white/60'}>Manage your content anytime from anywhere.</p>
      </div>

      <div
        className={
          'flex w-full max-w-md flex-col gap-4 rounded-large bg-default-100/75 px-5 py-6 drop-shadow-sm backdrop-blur-sm backdrop-saturate-150 sm:px-8'
        }
      >
        <div className={'grid grid-cols-[1fr_auto] items-center pb-2'}>
          <p className={'text-xl font-medium'}>Log In</p>
          <LogIn size={20} />
        </div>

        <SignInFormElement />

        <p className={'text-center text-small'}>
          <Link href='#'>Forgot password?</Link>
        </p>
      </div>
    </main>
  )
}

export default SignModule
