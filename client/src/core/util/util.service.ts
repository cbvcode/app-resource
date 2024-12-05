import type { UseFormSetError } from 'react-hook-form'

export const errorService = (res: any, setError: UseFormSetError<any>) => {
  if (!res?.success && res?.errors?.length) {
    res?.errors?.map((el: any) =>
      setError(el?.field?.toLowerCase() as any, { message: el?.value }, { shouldFocus: true }),
    )
  }
}
