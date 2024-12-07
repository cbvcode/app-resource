'use client'

import dynamic from 'next/dynamic'

import { FC } from 'react'

const AppProgressBar = dynamic(() => import('next-nprogress-bar').then((mod) => mod.AppProgressBar), { ssr: false })

// component
const ProgressBarComponent: FC = () => {
  // return
  return (
    <AppProgressBar height={'3px'} color={'rgba(86, 127, 250, 1)'} shallowRouting options={{ showSpinner: false }} />
  )
}

export default ProgressBarComponent
