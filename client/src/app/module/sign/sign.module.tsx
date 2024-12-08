import { ForgotPasswordElement } from './elements/forgot-password'
import { SignInFormElement } from './elements/sign-in-form'

import { FC } from 'react'

import { LocaleSelectComponent } from '@/app/shared/component/select/locale-select'
import { ThemeSelectComponent } from '@/app/shared/component/select/theme-select'
import { ESiteRoute } from '@/app/shared/interface/route.interface'
import { Link, t } from '@/core/lib/localization'

// interface
interface ISignModuleProps {
  variant?: 'sign-in' | 'forgot-password'
}

// component
const SignModule: FC<Readonly<ISignModuleProps>> = (props) => {
  const { variant = 'sign-in' } = props

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
          {t.page_sign_in_desc()}
        </p>
      </div>

      <div
        className={
          'flex w-full max-w-md flex-col gap-4 rounded-large bg-background/80 px-5 py-6 shadow-2xl drop-shadow-sm backdrop-blur-sm backdrop-saturate-150 sm:px-8'
        }
      >
        <div className='w-full text-left'>
          <p className='pb-1 text-2xl font-medium'>
            {variant === 'sign-in' ? t.page_sign_in_title() : t.page_sign_forgot_pass_title()}
          </p>
          <p className='pb-1 text-medium text-foreground/65'>
            {variant === 'sign-in' ? t.page_sign_in_subtitle() : t.page_sign_forgot_pass_subtitle()}
          </p>
        </div>

        {variant === 'sign-in' ? <SignInFormElement /> : <ForgotPasswordElement />}

        <p className={'text-center text-small'}>
          {variant === 'sign-in' ? (
            <Link href={ESiteRoute.FORGOT_PASS} className={'transition hover:text-foreground/80'}>
              {t.link_forgot_pass()}
            </Link>
          ) : (
            <Link
              href={ESiteRoute.BASE}
              className={'mx-auto flex w-fit items-center gap-1 transition hover:text-foreground/80'}
            >
              {t.link_back_to_sign_in()}
            </Link>
          )}
        </p>
      </div>
    </main>
  )
}

export default SignModule
