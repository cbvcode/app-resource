'use client'

import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/react'

import { Moon, Sun } from 'lucide-react'

import { FC, useEffect, useState } from 'react'

// interface
interface IThemeSelectComponentProps {}

// component
const ThemeSelectComponent: FC<Readonly<IThemeSelectComponentProps>> = () => {
  const [mounted, setMounted] = useState(false)

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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button isIconOnly variant={'light'}>
        <Sun />
      </Button>
    )
  }

  // return
  return (
    <Button onClick={handleChangeTheme} variant={'light'} isIconOnly aria-label={'change theme'}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}

export default ThemeSelectComponent
