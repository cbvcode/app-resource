'use client'

import dynamic from 'next/dynamic'

import { FC } from 'react'

const AppProgressBar = dynamic(() => import('next-nprogress-bar').then((mod) => mod.AppProgressBar), { ssr: false })

// component
const ProgressBarComponent: FC = () => {
  // return
  return (
    <AppProgressBar
      height={'4px'}
      color={'hsl(var(--nextui-primary))'}
      shallowRouting
      options={{ showSpinner: false }}
    />
  )
}

export default ProgressBarComponent
