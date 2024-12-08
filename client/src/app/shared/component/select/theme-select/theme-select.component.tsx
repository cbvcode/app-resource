'use client'

import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/react'

import { Moon, Sun } from 'lucide-react'

import { FC } from 'react'

// interface
interface IThemeSelectComponentProps {}

// component
const ThemeSelectComponent: FC<Readonly<IThemeSelectComponentProps>> = () => {
  const { theme, setTheme } = useTheme()
  const handleChangeTheme = () => {
    switch (theme) {
      case 'light': {
        setTheme('dark')
        break
      }
      case 'dark': {
        setTheme('light')
        break
      }
    }
  }

  // return
  return (
    <Button onClick={handleChangeTheme} variant={'light'} isIconOnly aria-label={'change theme'}>
      <Moon className={'dark:hidden'} /> <Sun className={'hidden dark:block'} />
    </Button>
  )
}

export default ThemeSelectComponent
