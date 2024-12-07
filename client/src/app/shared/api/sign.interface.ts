import { IRes } from '@/app/shared/interface/api.interface'

export interface ISignInReq {
  email: string
  password: string
}

export interface ISignInRes extends IRes {
  data: string | null
}
