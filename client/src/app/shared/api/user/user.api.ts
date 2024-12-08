import { IUserProfileRes } from '@/app/shared/api/user/user.interface'
import { EReqRoute } from '@/app/shared/interface/route.interface'
import { restApiFetcher } from '@/core/lib/rest-api/fetcher'

// user profile api
export const userProfileApi = async () => {
  try {
    const res = await restApiFetcher.get<IUserProfileRes>(EReqRoute.USER_PROFILE, {
      next: { revalidate: 0 },
    })

    return await res.json()
  } catch {
    return null
  }
}
