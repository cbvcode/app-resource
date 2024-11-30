'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'

import { FC, ReactNode } from 'react'

// interface
interface IUiProviderProps {
  children: ReactNode
}

// component
const UiProvider: FC<Readonly<IUiProviderProps>> = (props) => {
  const { children } = props

  // return
  return (
    <NextUIProvider>
      <NextThemesProvider attribute={'class'} defaultTheme={'dark'}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default UiProvider
