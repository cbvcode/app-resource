import type { Metadata } from 'next'

import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import { RestApiProvider } from '../../core/lib/rest-api'
import { UiProvider } from '../../core/lib/ui'

import './globals.css'

export const metadata: Metadata = {
  title: 'CRM',
  description: 'Manage your content anytime from anywhere',
}

// interface
interface IRootLayoutProps {
  children: ReactNode
}

// component
const RootLayout: FC<Readonly<IRootLayoutProps>> = (props) => {
  const { children } = props

  // return
  return (
    <html lang={'en'} suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning>
        <UiProvider>
          <RestApiProvider>{children}</RestApiProvider>

          <Toaster />
        </UiProvider>
      </body>
    </html>
  )
}

export default RootLayout
