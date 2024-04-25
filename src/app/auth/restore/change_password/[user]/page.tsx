'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Textfield } from '@/components/ui/Textfield'
import { Forms } from '@/helpers/form'
import Container from '@/layouts/container'
import { UsersTypes } from '@/types/users'

export default function Page(
  { params }: { params: { user: string } },
) {
  const [isFetching, setIsFetching] = React.useState(false)

  const router = useRouter()
  const toast = useToast()

  const {
    handleSubmit,
    register,
    formState: {
      errors,
    },
    getValues,
  } = useForm<UsersTypes.Form>()

  const onSubmit = async (data: UsersTypes.Form) => {
    setIsFetching(true)

    try {
      const response = await fetch(`/api/auth/restore/change_password/${params.user}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: 'Успех!',
          description: 'Пароль успешно изменен!',
          duration: 2500,
          isClosable: true,
          status: 'success',
        })

        router.push('/auth/signin')
      }
    } catch (error: any) {
      console.error('Error', error)
    } finally {
      setTimeout(() => setIsFetching(false), 1000)
    }
  }

  return (
    <Container>
      <div className="flex justify-center">
        <div className="flex flex-col phone:w-[95%] tablet:w-[490px] space-y-4">
          <div className="flex justify-center items-center">
            <Image
              src="/img/eilbay_logo.svg"
              alt="Eilbay"
              width={25}
              height={30}
            />
            <p className="text-2xl font-medium ml-1 font-marmelad">Eilbay</p>
          </div>

          <p className="text-3xl text-center pb-6 font-medium">
            Восстановление пароля
          </p>

          <p className="text-sm font-semibold text-center">
            Шаг 2 / 3
          </p>

          <p className="text-center font-medium">
            Введите код, отправленный на Ваш e-mail
          </p>

          <Textfield
            label="Новый пароль"
            type="password"
            error={errors.password && errors.password.message}
            placeholder="Введите пароль"
            {...register('password', Forms.Options.Rules.User.Password)}
          />

          <Textfield
            label="Повторите Ваш пароль"
            type="password"
            error={errors.confirm_password && errors.confirm_password.message}
            placeholder="Повторите пароль"
            {...register('confirm_password', {
              required: Forms.Options.required,
              validate: {
                match: value => getValues().password === value || 'Пароль не совпадает',
              },
            })}
          />

          <Button
            className="bg-btnBg hover:bg-btnBgHover py-7 rounded-full text-white"
            isLoading={isFetching}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Подтвердить e-mail
          </Button>
        </div>
      </div>
    </Container>
  )
}
