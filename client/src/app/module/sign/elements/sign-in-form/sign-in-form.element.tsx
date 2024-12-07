'use client'

import { Button, Checkbox, Input, Tooltip } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'

import { Eye, EyeOff } from 'lucide-react'

import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { ISignInReq, signInApi } from '@/app/shared/api/sign.api'
import { customToast } from '@/core/lib/toast'
import { errorService } from '@/core/util/util.service'

// interface
interface ISignInFormElementProps {}

// component
const SignInFormElement: FC<Readonly<ISignInFormElementProps>> = () => {
  const [isVisible, setIsVisible] = useState(false)
  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const { handleSubmit, control, setError } = useForm<ISignInReq>({ defaultValues: { email: '', password: '' } })

  const { mutate, isPending } = useMutation({
    mutationFn: signInApi,
    onSuccess: (res) => {
      customToast(res.message, 'error')
      errorService(res, setError)
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
            label={'Email Address'}
            placeholder={'Enter your email'}
            variant={'bordered'}
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
            endContent={
              <Tooltip content={`${isVisible ? 'Hide' : 'Show'} password`} placement={'left'}>
                <Button
                  onClick={handleVisibility}
                  className={'-mb-0.5 -mr-1'}
                  isIconOnly
                  variant={'light'}
                  size={'sm'}
                  aria-label={`${isVisible ? 'Hide' : 'Show'} password`}
                >
                  {isVisible ? (
                    <EyeOff className={'pointer-events-none text-foreground/50'} />
                  ) : (
                    <Eye className={'pointer-events-none text-foreground/50'} />
                  )}
                </Button>
              </Tooltip>
            }
            label={'Password'}
            name={'password'}
            placeholder={'Enter your password'}
            type={isVisible ? 'text' : 'password'}
            variant={'bordered'}
            size={'lg'}
          />
        )}
      />

      <div className={'flex items-center justify-end px-0 py-2'}>
        <Checkbox classNames={{ base: 'flex flex-row-reverse gap-2' }} size={'sm'}>
          Remember me
        </Checkbox>
      </div>

      <Button isLoading={isPending} type={'submit'} color={'primary'} size={'lg'}>
        Log In
      </Button>
    </form>
  )
}

export default SignInFormElement
