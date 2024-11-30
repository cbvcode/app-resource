import { ISignInReq, ISignInRes } from '@/app/shared/api/sign/sign.interface'
import { apiFetcher } from '@/core/rest-api/fetcher'

export const signInApi = (json: ISignInReq) => {
  return apiFetcher.post<ISignInRes>('sign-in', { json, throwHttpErrors: false }).json()
}
