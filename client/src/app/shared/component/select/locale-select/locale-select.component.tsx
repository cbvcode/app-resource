'use client'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'

import { Languages } from 'lucide-react'

import { FC, useState } from 'react'

import { Link, usePathname } from '@/core/lib/localization'

// interface
interface ILocaleSelectComponentProps {}

// component
const LocaleSelectComponent: FC<Readonly<ILocaleSelectComponentProps>> = () => {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const handleChangeLang = () => {
    setIsOpen(false)
  }

  // return
  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement={'bottom'}>
      <PopoverTrigger>
        <Button isIconOnly variant={'light'} aria-label={'change lang'}>
          <Languages />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={'min-w-[44px] rounded-medium px-0 py-1'}>
        <Button
          as={Link}
          href={pathname}
          locale={'en'}
          onClick={handleChangeLang}
          variant={'light'}
          isIconOnly
          className={'w-full rounded-none'}
        >
          EN
        </Button>

        <Button
          as={Link}
          href={pathname}
          locale={'uk'}
          onClick={handleChangeLang}
          variant={'light'}
          isIconOnly
          className={'w-full rounded-none'}
        >
          UK
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default LocaleSelectComponent
