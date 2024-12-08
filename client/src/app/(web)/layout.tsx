import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { LanguageProvider } from '@inlang/paraglide-next'

import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import { LayoutModule } from '@/app/module/layout'
import { languageTag } from '@/core/lib/localization'
import { ProgressBarComponent } from '@/core/lib/progress-bar'
import { RestApiProvider } from '@/core/lib/rest-api'
import { UiProvider } from '@/core/lib/ui'

import './globals.css'

export const metadata: Metadata = {
  title: 'CRM',
  description: 'Manage your content anytime from anywhere',
}

// interface
interface IRootLayoutProps {
  children: ReactNode
  dashboard: ReactNode
}

// component
const RootLayout: FC<Readonly<IRootLayoutProps>> = async (props) => {
  const { children, dashboard } = props

  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value

  // return
  return (
    <LanguageProvider>
      <html lang={languageTag()} suppressHydrationWarning>
        <body className={`antialiased`} suppressHydrationWarning>
          <UiProvider>
            <RestApiProvider>{!token ? children : <LayoutModule>{dashboard}</LayoutModule>}</RestApiProvider>

            <Toaster />
            <ProgressBarComponent />
          </UiProvider>
        </body>
      </html>
    </LanguageProvider>
  )
}

export default RootLayout
