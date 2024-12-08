'use client'

import { Button, Input } from '@nextui-org/react'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useSignInMutation } from '@/app/shared/api/sign/sign.hook'
import { ISignInReq } from '@/app/shared/api/sign/sign.interface'
import { ESiteRoute } from '@/app/shared/interface/route.interface'
import { t, useRouter } from '@/core/lib/localization'
import { errorService, successService } from '@/core/util/util.service'

// interface
interface IForgotPasswordElementProps {}

// component
const ForgotPasswordElement: FC<Readonly<IForgotPasswordElementProps>> = () => {
  const router = useRouter()

  const { handleSubmit, control, setError } = useForm<ISignInReq>({ defaultValues: { email: '', password: '' } })

  const { mutate, isPending } = useSignInMutation({
    onSuccess: (res) => {
      if (res.success) {
        successService(res)
        router.replace(ESiteRoute.BASE)
        router.refresh()
      } else {
        errorService(res, setError)
      }
    },
    onError: (error) => {
      errorService(error.message)
    },
  })
  const handleSignIn = (data: ISignInReq) => {
    mutate(data)
  }

  // return
  return (
    <form onSubmit={handleSubmit(handleSignIn)} className={'flex flex-col gap-3'}>
      <Controller
        control={control}
        name={'email'}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            value={value}
            onChange={onChange}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
            classNames={{ errorMessage: 'first-letter:capitalize' }}
            label={t.label_email_addr()}
            placeholder={t.placeholder_email()}
            variant={'faded'}
            size={'lg'}
          />
        )}
      />

      <Button isLoading={isPending} type={'submit'} color={'primary'} size={'lg'}>
        {t.btn_send()}
      </Button>
    </form>
  )
}

export default ForgotPasswordElement
