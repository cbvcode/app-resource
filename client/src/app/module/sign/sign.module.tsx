import Link from 'next/link'

import { SignInFormElement } from './elements/sign-in-form'
import { Feather } from 'lucide-react'

import { FC } from 'react'

// interface
interface ISignModuleProps {}

// component
const SignModule: FC<Readonly<ISignModuleProps>> = () => {
  // return
  return (
    <div
      className='rounded-small bg-content1 flex h-screen w-screen items-center justify-center overflow-hidden p-2 sm:p-4 lg:p-8'
      style={{
        backgroundImage:
          'url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture-2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute right-10 top-10'>
        <div className='flex items-center'>
          <Feather />
          <p className='font-medium text-white'>ACME</p>
        </div>
      </div>

      <div className='absolute bottom-10 right-10 hidden md:block'>
        <p className='max-w-xl text-right text-white/60'>
          <span className='font-medium'>“</span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquet.
          <span className='font-medium'>”</span>
        </p>
      </div>

      <div className='rounded-large bg-background/60 shadow-small dark:bg-default-100/50 flex w-full max-w-sm flex-col gap-4 px-8 pb-10 pt-6 backdrop-blur-md backdrop-saturate-150'>
        <p className='pb-2 text-xl font-medium'>Log In</p>

        <SignInFormElement />

        <p className='text-small text-center'>
          Need to create an account?&nbsp;
          <Link href='#'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default SignModule
