import { ISignInReq, ISignInRes } from '@/app/shared/api/sign/sign.interface'
import { restApiFetcher } from '@/core/rest-api/fetcher'

export const signInApi = (json: ISignInReq) => {
  return restApiFetcher.post<ISignInRes>('sign-in', { json }).json()
}
