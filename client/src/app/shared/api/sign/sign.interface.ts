export interface ISignInReq {
  email: string
  password: string
}

export interface ISignInRes {
  success: boolean
  message: string
  errors: { field: string; value: string }[] | null
  data: string | null
}
