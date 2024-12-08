'use client'

import { Spinner } from '@nextui-org/react'

import { FC, useEffect } from 'react'

import { useUserProfileQuery } from '@/app/shared/api/user/user.hook'
import { languageTag, usePathname } from '@/core/lib/localization'

// interface
interface IUserElementProps {}

// component
const UserElement: FC<Readonly<IUserElementProps>> = () => {
  const pathname = usePathname()

  const { data, isLoading, refetch } = useUserProfileQuery()

  if (!data?.data && !isLoading) {
    window.location.replace(`/${languageTag()}`)
  }

  useEffect(() => {
    if (!isLoading) {
      refetch().finally()
    }
  }, [pathname])

  // return
  return (
    <>
      {isLoading ? (
        <div className={'t-0 l-0 fixed flex h-screen w-screen items-center justify-center backdrop-blur-sm'}>
          <Spinner
            color={'current'}
            classNames={{ wrapper: 'w-[46px]', circle1: 'h-[46px] w-[46px]', circle2: 'h-[46px] w-[46px]' }}
          />
        </div>
      ) : null}
    </>
  )
}

export default UserElement
