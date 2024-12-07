import { ISignInReq, ISignInRes } from '@/app/shared/api/sign/sign.interface'
import { EReqRoute } from '@/app/shared/interface/route.interface'
import { restApiFetcher } from '@/core/lib/rest-api/fetcher'

// sign in api
export const signInApi = (json: ISignInReq) => {
  return restApiFetcher.post<ISignInRes>(EReqRoute.SIGN_IN, { json }).json()
}
