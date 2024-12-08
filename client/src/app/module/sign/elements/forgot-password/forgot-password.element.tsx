'use client'

import { Button, Input } from '@nextui-org/react'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useForgotPasswordMutation } from '@/app/shared/api/sign/sign.hook'
import { ISignInReq } from '@/app/shared/api/sign/sign.interface'
import { ESiteRoute } from '@/app/shared/interface/route.interface'
import { errorService, successService } from '@/app/shared/service/msg.service'
import { t, useRouter } from '@/core/lib/localization'

// interface
interface IForgotPasswordElementProps {}

// component
const ForgotPasswordElement: FC<Readonly<IForgotPasswordElementProps>> = () => {
  const router = useRouter()

  const { handleSubmit, control, setError } = useForm<Omit<ISignInReq, 'password'>>({ defaultValues: { email: '' } })

  const { mutate, isPending } = useForgotPasswordMutation({
    onSuccess: (res) => {
      if (res.success) {
        successService(res)
        router.replace(ESiteRoute.BASE)
      } else {
        errorService(res, setError)
      }
    },
    onError: (error) => {
      errorService(error.message)
    },
  })
  const handleOnSubmit = (data: Omit<ISignInReq, 'password'>) => {
    mutate(data)
  }

  // return
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className={'flex flex-col gap-3'}>
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
