'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getQueryClient } from './service'

import { FC, ReactNode } from 'react'

// interface
interface IRestApiProviderProps {
  children: ReactNode
}

// component
const RestApiProvider: FC<Readonly<IRestApiProviderProps>> = (props) => {
  const { children } = props

  const queryClient = getQueryClient()

  // return
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default RestApiProvider
