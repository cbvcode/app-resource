import ky, { KyInstance } from 'ky'

export const apiFetcher: KyInstance = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  credentials: 'include',
})
