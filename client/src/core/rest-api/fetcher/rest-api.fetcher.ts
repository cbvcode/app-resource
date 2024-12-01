import ky, { KyInstance } from 'ky'

export const restApiFetcher: KyInstance = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  credentials: 'include',
  throwHttpErrors: false,
})
