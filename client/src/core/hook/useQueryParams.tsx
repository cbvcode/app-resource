import { useSearchParams } from 'next/navigation'

import { usePathname, useRouter } from '@/core/lib/localization'

// query search params hook
export const useQueryParams = () => {
  const { push } = useRouter()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQuery = (name: string, value?: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete('page')

    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    return params.toString()
  }

  const changeQuery = (name: string, value?: string, scroll?: boolean) => {
    push(pathname + '?' + createQuery(name, value), { scroll: !scroll })
  }

  const allQueriesParams = String(new URLSearchParams(searchParams))

  // return
  return { searchParams, allQueriesParams, changeQuery }
}
