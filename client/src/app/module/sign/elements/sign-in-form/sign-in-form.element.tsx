'use client'

import { Button, Checkbox, Input, Tooltip } from '@nextui-org/react'

import { Eye, EyeOff } from 'lucide-react'

import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useSignInMutation } from '@/app/shared/api/sign/sign.hook'
import { ISignInReq } from '@/app/shared/api/sign/sign.interface'
import { ESiteRoute } from '@/app/shared/interface/route.interface'
import { t, useRouter } from '@/core/lib/localization'
import { customToast } from '@/core/lib/toast'
import { errorService } from '@/core/util/util.service'

// interface
interface ISignInFormElementProps {}

// component
const SignInFormElement: FC<Readonly<ISignInFormElementProps>> = () => {
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)
  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const { handleSubmit, control, setError } = useForm<ISignInReq>({ defaultValues: { email: '', password: '' } })

  const { mutate, isPending } = useSignInMutation({
    onSuccess: (res) => {
      if (res.success) {
        customToast(res.message, 'success')
        router.replace(ESiteRoute.BASE)
        router.refresh()
      } else {
        customToast(res.message, 'error')
        errorService(res, setError)
      }
    },
    onError: (error) => {
      customToast(error.message, 'error')
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

      <Controller
        control={control}
        name={'password'}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            value={value}
            onChange={onChange}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
            classNames={{ errorMessage: 'first-letter:capitalize' }}
            endContent={
              <Tooltip content={isVisible ? t.label_hide_pass() : t.label_show_pass()} placement={'left'}>
                <Button
                  onClick={handleVisibility}
                  className={'-mb-0.5 -mr-1'}
                  isIconOnly
                  variant={'light'}
                  size={'sm'}
                  aria-label={isVisible ? t.label_hide_pass() : t.label_show_pass()}
                >
                  {isVisible ? (
                    <EyeOff className={'pointer-events-none text-foreground/50'} />
                  ) : (
                    <Eye className={'pointer-events-none text-foreground/50'} />
                  )}
                </Button>
              </Tooltip>
            }
            label={t.label_pass()}
            name={'password'}
            placeholder={t.placeholder_pass()}
            type={isVisible ? 'text' : 'password'}
            variant={'faded'}
            size={'lg'}
          />
        )}
      />

      <div className={'flex items-center justify-end px-0 py-2'}>
        <Checkbox classNames={{ base: 'flex flex-row-reverse gap-2' }} size={'sm'}>
          {t.label_remember_me()}
        </Checkbox>
      </div>

      <Button isLoading={isPending} type={'submit'} color={'primary'} size={'lg'}>
        {t.btn_login()}
      </Button>
    </form>
  )
}

export default SignInFormElement
