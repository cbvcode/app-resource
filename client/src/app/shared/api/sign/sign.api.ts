import { ISignInReq, ISignInRes } from '@/app/shared/api/sign/sign.interface'
import { EReqRoute } from '@/app/shared/interface/route.interface'
import { restApiFetcher } from '@/core/lib/rest-api/fetcher'

// sign in api
export const signInApi = (json: ISignInReq) => {
  return restApiFetcher.post<ISignInRes>(EReqRoute.SIGN_IN, { json }).json()
}

// forgot password api
export const forgotPasswordApi = (json: Omit<ISignInReq, 'password'>) => {
  return restApiFetcher.post<ISignInRes>(EReqRoute.FORGOT_PASSWORD, { json }).json()
}
