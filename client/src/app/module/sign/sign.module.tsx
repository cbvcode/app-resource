import Link from 'next/link'

import { SignInFormElement } from './elements/sign-in-form'
import { LogIn, PencilRuler } from 'lucide-react'

import { FC } from 'react'

// interface
interface ISignModuleProps {}

// component
const SignModule: FC<Readonly<ISignModuleProps>> = () => {
  // return
  return (
    <main
      className={'flex h-screen w-screen items-center justify-center overflow-hidden rounded-small p-2 sm:p-4 lg:p-8'}
      style={{
        backgroundImage: 'url(/image/sign-bg.jpg)',
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

      <div className={'absolute bottom-10 right-10'}>
        <p className={'max-w-xl text-center text-small text-white/60'}>Manage your content anytime from anywhere.</p>
      </div>

      <div
        className={
          'flex w-full max-w-sm flex-col gap-4 rounded-large bg-default-100/50 px-8 py-6 shadow-small backdrop-blur-md backdrop-saturate-150'
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
