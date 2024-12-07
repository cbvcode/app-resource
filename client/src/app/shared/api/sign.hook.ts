import { useMutation } from '@tanstack/react-query'

import { signInApi } from '@/app/shared/api/sign.api'
import { ISignInRes } from '@/app/shared/api/sign.interface'

// interface
interface ISignInMutationOptions {
  onSuccess: (res: ISignInRes) => void
}

// sign in hook
export const useSignInMutation = (options: ISignInMutationOptions) => {
  return useMutation({
    ...options,
    mutationFn: signInApi,
  })
}
