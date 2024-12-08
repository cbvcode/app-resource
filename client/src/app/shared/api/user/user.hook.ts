import { useQuery } from '@tanstack/react-query'

import { userProfileApi } from '@/app/shared/api/user/user.api'
import { IUserProfileRes } from '@/app/shared/api/user/user.interface'
import { EReqRoute } from '@/app/shared/interface/route.interface'

// interface
interface IUserProfileMutationOptions {
  onSuccess?: (res: IUserProfileRes) => void
  onError?: (error: Error) => void
}

// sign in hook
export const useUserProfileQuery = () => {
  // return
  return useQuery({
    queryKey: [EReqRoute.USER_PROFILE],
    queryFn: userProfileApi,
  })
}
