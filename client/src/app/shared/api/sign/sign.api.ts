import { restApiFetcher } from '@/core/rest-api/fetcher'

export interface ISignInReq {
  email: string
  password: string
}

export interface ISignInRes {
  success: boolean
  message: string
  errors: { field: string; value: string }[] | null
  data: string | null
}

export const signInApi = (json: ISignInReq) => {
  return restApiFetcher.post<ISignInRes>('sign-in', { json }).json()
}
