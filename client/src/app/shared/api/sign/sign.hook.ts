import { useMutation } from '@tanstack/react-query'

import { forgotPasswordApi, signInApi } from '@/app/shared/api/sign/sign.api'
import { ISignInRes } from '@/app/shared/api/sign/sign.interface'
import { EReqRoute } from '@/app/shared/interface/route.interface'

// interface
interface ISignInMutationOptions {
  onSuccess?: (res: ISignInRes) => void
  onError?: (error: Error) => void
}
interface IForgotPasswordMutationOptions extends ISignInMutationOptions {}

// sign in hook
export const useSignInMutation = (options: ISignInMutationOptions) => {
  // return
  return useMutation({
    ...options,
    mutationKey: [EReqRoute.SIGN_IN],
    mutationFn: signInApi,
  })
}

// forgot password hook
export const useForgotPasswordMutation = (options: IForgotPasswordMutationOptions) => {
  // return
  return useMutation({
    ...options,
    mutationKey: [EReqRoute.FORGOT_PASSWORD],
    mutationFn: forgotPasswordApi,
  })
}
