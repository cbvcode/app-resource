import { defaultShouldDehydrateQuery, isServer, QueryClient } from '@tanstack/react-query'

let browserQueryClient: QueryClient | undefined = undefined

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
      dehydrate: {
        shouldDehydrateQuery: (query) => {
          return defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
        },
      },
    },
  })
}

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
