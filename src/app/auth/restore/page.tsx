'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Textfield } from '@/components/ui/Textfield'
import { Forms } from '@/helpers/form'
import Container from '@/layouts/container'
import { UsersTypes } from '@/types/users'


export default function Page() {
  const [isFetching, setIsFetching] = React.useState(false)

  const toast = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<UsersTypes.Form>()

  const onSubmit = async (data: UsersTypes.Form) => {
    setIsFetching(true)

    try {
      const response = await fetch('/api/auth/restore/', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        toast({
          title: 'Пользователь не найден!',
          status: 'error',
          duration: 2500,
          isClosable: true,
          position: 'bottom',
        })
      }

      if (response.ok) {
        router.push('/auth/restore/verify')
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
            Шаг 1 / 3
          </p>

          <Textfield
            label="Почта"
            error={errors.email && errors.email.message}
            {...register('email', Forms.Options.Rules.User.Email)}

          />

          <Button
            type="submit"
            className="py-6 rounded-full bg-btnBg hover:bg-btnBgHover text-white"
            onClick={handleSubmit(onSubmit)}
            isLoading={isFetching}
          >
            Подтвердить
          </Button>
        </div>
      </div>
    </Container>
  )
}
