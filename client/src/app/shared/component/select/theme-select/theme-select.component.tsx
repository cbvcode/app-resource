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
    <Button onPress={handleChangeTheme} variant={'light'} isIconOnly aria-label={'change theme'}>
      <Moon key={'theme-light'} size={20} className={'dark:hidden'} />
      <Sun key={'theme-dark'} size={20} className={'hidden dark:block'} />
    </Button>
  )
}

export default ThemeSelectComponent
