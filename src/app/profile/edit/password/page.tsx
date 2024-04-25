'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { 
  Button,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'

import { Textfield } from '@/components/ui/Textfield'
import axiosRequest from '@/configs/axios'
import { Forms } from '@/helpers/form'
import { useUserStore } from '@/store/useUserStore'
import { UsersTypes } from '@/types/users'

const Page = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const profile = useUserStore(store => store.user)

  const toast = useToast()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    getValues,
    formState: {
      errors,
    },
  } = useForm<UsersTypes.Form>()

  const onSubmit = React.useCallback(async (body: UsersTypes.Form) => {
    setIsLoading(true)

    try {
      await axiosRequest.patch(`/accounts/users/${profile?.id}/update_password_check_old/`, {
        password: body.password,
        old_password: body.old_password,
      })

      await axiosRequest.patch(`/accounts/users/${profile?.id}/update_password/`, {
        password: body.password,
      })

      toast({
        title: 'Успех!',
        description: 'Пароль успешно изменен!',
        isClosable: true,
        duration: 2500,
        status: 'success',
      })

      window.scrollTo(0, 0)
      router.back()
    } catch (e) {
      const error = e as AxiosError

      throw new Error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [profile?.id, router, toast])

  const accessToken = Cookies.get('accessToken')
  if(!accessToken) return redirect('/auth/signin')
  
  return (
    <div className="flex flex-col items-center justify-center text-center phone:w-[95%] tablet:w-[490px] h-[90vh] space-y-4 py-10">
      <div className="flex justify-center items-center">
        <Image
          src="/img/eilbay_logo.svg"
          alt="Eilbay"
          width={25}
          height={30}
        />
        <p className="font-marmelad text-lg tablet:text-2xl font-bold ml-[5px]">Eilbay</p>
      </div>

      <p className="text-xl tablet:text-[28px] font-semibold text-center leading-none">
        Изменение пароля
      </p>

      <p
        className="text-xs tablet:text-sm font-semibold text-[#78828A] mb-5 tablet:!mb-8"
      >
        Пароль должен содержать не менее шести символов, включая цифры, буквы и специальные символы (!$@%)
      </p>

      <Stack className="w-full">
        <Textfield 
          label="Текущий пароль"
          type="password"
          placeholder="Введите текущий пароль"
          {...register('old_password', Forms.Options.Rules.User.Password)}
          error={errors.old_password && 'Неверный пароль!'}
        />
      </Stack>

      <Stack className="w-full">
        <Textfield 
          label="Новый пароль"
          type="password"
          placeholder="Введите пароль"
          {...register('password', Forms.Options.Rules.User.Password)}
          error={errors.password && errors.password.message}
        />
      </Stack>

      <Stack className="w-full">
        <Textfield 
          label="Подтвердите ваш пароль"
          type="password"
          placeholder="Подтвердите пароль"
          error={errors.confirm_password && errors.confirm_password.message}
          {...register('confirm_password', {
            required: Forms.Options.required,
            validate: {
              match: value => getValues().password === value || 'Пароль не совпадает',
            },
          })}
        />
      </Stack>

      <Button
        className="text-white rounded-full py-6 w-full"
        colorScheme="blue"
        type="submit"
        onClick={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        Изменить
      </Button>
    </div>
  )
}

export default Page
