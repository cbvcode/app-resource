import { IRes } from '@/app/shared/interface/api.interface'
import { EReqRoute } from '@/app/shared/interface/route.interface'
import { restApiFetcher } from '@/core/lib/rest-api/fetcher'

export interface ISignInReq {
  email: string
  password: string
}

export interface ISignInRes extends IRes {
  data: string | null
}

export const signInApi = (json: ISignInReq) => {
  return restApiFetcher.post<ISignInRes>(EReqRoute.SIGN_IN, { json }).json()
}
