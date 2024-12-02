export interface IRes {
  success: boolean
  message: string
  errors: { field: string; value: string }[] | null
}
