import { SignInFormElement } from './elements/sign-in-form'

import { FC } from 'react'

import { LocaleSelectComponent } from '@/app/shared/component/select/locale-select'
import { ThemeSelectComponent } from '@/app/shared/component/select/theme-select'
import { Link } from '@/core/lib/localization'

// interface
interface ISignModuleProps {}

// component
const SignModule: FC<Readonly<ISignModuleProps>> = () => {
  // return
  return (
    <main
      className={`flex h-screen w-screen items-center justify-center overflow-hidden bg-[url('/image/sign-bg.webp')] bg-cover bg-center p-4 sm:p-6 lg:p-8`}
    >
      <div className={'absolute right-4 top-4 md:right-6 md:top-6'}>
        <div className={'flex items-center rounded-medium bg-background/40 pl-1 text-foreground/85 backdrop-blur-sm'}>
          <h1 className={'mx-2 text-xl font-medium'}>CRM</h1>

          <LocaleSelectComponent />

          <ThemeSelectComponent />
        </div>
      </div>

      <div className={'absolute bottom-10 right-10 hidden md:block'}>
        <p
          className={
            'max-w-xl rounded-small bg-background/40 px-2 py-1 text-center text-small text-foreground/85 backdrop-blur-sm'
          }
        >
          Manage your content anytime from anywhere.
        </p>
      </div>

      <div
        className={
          'flex w-full max-w-md flex-col gap-4 rounded-large bg-background/80 px-5 py-6 shadow-2xl drop-shadow-sm backdrop-blur-sm backdrop-saturate-150 sm:px-8'
        }
      >
        <div className='w-full text-left'>
          <p className='pb-1 text-2xl font-medium'>Welcome Back</p>
          <p className='pb-1 text-medium text-foreground/65'>Log in to your account to continue</p>
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
