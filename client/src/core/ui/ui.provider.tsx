'use client'

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
  return <NextUIProvider>{children}</NextUIProvider>
}

export default UiProvider
