import type { UseFormSetError } from 'react-hook-form'

import { t } from '@/core/lib/localization'
import { customToast } from '@/core/lib/toast'

export const successService = (res: any) => {
  if (res?.success && res.message) {
    let message = ''

    switch (res.message.toLowerCase()) {
      case 'welcome': {
        message = t.success_welcome()
        break
      }
      case 'see you later': {
        message = t.success_see_you_later()
        break
      }

      default: {
        message = res.message
        break
      }
    }

    customToast(message, 'success')
  }
}

export const errorService = (res: any, setError?: UseFormSetError<any>) => {
  const getErrMsg = (msg: string) => {
    let message = ''

    switch (msg.toLowerCase()) {
      case 'invalid request body': {
        message = t.err_invalid_request_body()
        break
      }
      case 'incorrect email or password': {
        message = t.err_incorrect_email_or_password()
        break
      }
      case 'user not found': {
        message = t.err_user_not_found()
        break
      }
      case 'you are unauthorized': {
        message = t.err_you_are_unauthorized()
        break
      }
      case 'too many requests': {
        message = t.err_too_many_requests()
        break
      }
      case 'bad request': {
        message = t.err_bad_request()
        break
      }
      case 'required': {
        message = t.err_required()
        break
      }
      case 'email already in use': {
        message = t.err_email_already_in_use()
        break
      }
      case 'passwords do not match': {
        message = t.err_passwords_do_not_match()
        break
      }
      case 'incorrect email format': {
        message = t.err_incorrect_email_format()
        break
      }

      default: {
        message = t.err_smt_wrong()
        break
      }
    }

    return message
  }

  if (!res?.success && res.message) {
    const message = getErrMsg(res.message)

    customToast(message, 'error')
  }

  if (!res?.success && res?.errors?.length && setError) {
    res?.errors?.map((el: any) => {
      const message = getErrMsg(el.value)

      return setError(el?.field?.toLowerCase(), { message }, { shouldFocus: true })
    })
  }
}
