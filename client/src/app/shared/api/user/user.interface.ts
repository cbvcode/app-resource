import { IRes } from '@/app/shared/interface/api.interface'

export interface IUserProfileRes extends IRes {
  data: {
    email: 'string'
    id: 'string'
    username: 'string'
  }
}
