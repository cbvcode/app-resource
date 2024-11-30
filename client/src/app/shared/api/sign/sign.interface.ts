export interface ISignInReq {
  email: string
  password: string
}

export interface ISignInRes {
  success: boolean
  errors: { field: string; value: string }[] | null
  data: string | null
}
