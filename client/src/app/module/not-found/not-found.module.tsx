'use client'

import { Button } from '@nextui-org/react'

import { FC } from 'react'

import { ESiteRoute } from '@/app/shared/interface/route.interface'
import { Link, t } from '@/core/lib/localization'

// interface
interface INotFoundModuleProps {}

// component
const NotFoundModule: FC<Readonly<INotFoundModuleProps>> = () => {
  // return
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <h1 className='mb-4 text-xl font-bold lg:text-2xl'>{t.page_not_found_title()}</h1>
      <p className='text-muted-foreground mb-8 text-medium lg:text-large'>{t.page_not_found_subtitle()}</p>

      <Button as={Link} href={ESiteRoute.BASE} variant={'bordered'}>
        {t.btn_to_home()}
      </Button>
    </main>
  )
}

export default NotFoundModule
