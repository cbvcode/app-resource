import { useMutation } from '@tanstack/react-query'

import { signInApi } from '@/app/shared/api/sign/sign.api'
import { ISignInRes } from '@/app/shared/api/sign/sign.interface'
import { EReqRoute } from '@/app/shared/interface/route.interface'

// interface
interface ISignInMutationOptions {
  onSuccess?: (res: ISignInRes) => void
  onError?: (error: Error) => void
}

// sign in hook
export const useSignInMutation = (options: ISignInMutationOptions) => {
  // return
  return useMutation({
    ...options,
    mutationKey: [EReqRoute.SIGN_IN],
    mutationFn: signInApi,
  })
}
