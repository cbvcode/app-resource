'use client'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'

import { Languages } from 'lucide-react'

import { FC, useState } from 'react'

import { languageTag, Link, usePathname } from '@/core/lib/localization'

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
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement={'left'}>
      <PopoverTrigger>
        <Button isIconOnly variant={'light'} aria-label={'change lang'}>
          <Languages />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={'flex min-w-[48px] flex-row rounded-medium p-0'}>
        <Button
          as={Link}
          href={pathname}
          locale={'en'}
          onClick={handleChangeLang}
          variant={'light'}
          isIconOnly
          className={'w-full'}
          isDisabled={languageTag() === 'en'}
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
          className={'w-full'}
          isDisabled={languageTag() === 'uk'}
        >
          UK
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default LocaleSelectComponent
