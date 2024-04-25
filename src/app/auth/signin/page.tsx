'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Textfield } from '@/components/ui/Textfield'
import axiosRequest from '@/configs/axios'
import { signInWithGoogle } from '@/configs/firebase'
import { Forms } from '@/helpers/form'
import { google_icon } from '@/images'
import Container from '@/layouts/container'
import { setJWTToCookies } from '@/tools'

const Page = () => {
  const [isFetching, setIsFetching] = React.useState(false)

  const router = useRouter()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<{
    username: string
    password: string
  }>()

  const onSubmit = async (user: { username: string, password: string }) => {
    setIsFetching(true)

    try {
      const { data } = await axiosRequest.post<{ access: string, refresh: string }>('/accounts/token/', user)

      setJWTToCookies(data)
      router.push('/profile/view')
    } catch (error) {
      toast({
        title: 'Не верный пароль или имя!',
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'bottom',
      })
    } finally {
      setTimeout(() => setIsFetching(false), 1000)
    }
  }

  const googleAuth = async () => {
    setIsFetching(true)

    signInWithGoogle()
      .then(async (res) => {
        const token = (res as any)['_tokenResponse'].idToken

        if (!token) {
          return toast({
            title: 'Упс! Что-то не так!',
            status: 'error',
            duration: 2500,
            isClosable: true,
            position: 'bottom',
          })
        }

        try {
          const { data } = await axiosRequest.post<{ access: string, refresh: string }>('/accounts/users/social_signin/', { token })
          setJWTToCookies(data)
          router.push('/profile/view')
        } catch (error) {
          toast({
            title: 'Упс! Что-то не так!',
            status: 'error',
            duration: 2500,
            isClosable: true,
            position: 'bottom',
          })
        } finally {
          setTimeout(() => setIsFetching(false), 1000)
        }
      })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)()
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
            Добро пожаловать!<br />Мы ради видеть тебя снова
          </p>

          <Button
            leftIcon={<Image src={google_icon} alt="google_icon" />}
            variant="outline"
            className="py-6 rounded-full"
            borderColor="gray"
            onClick={googleAuth}
          >
            Войти через Google
          </Button>

          <div className="flex items-center">
            <div className="border-b-[1px] border-slate-500 flex-1"></div>
            <p className="px-5">или</p>
            <div className="border-b-[1px] border-slate-500 flex-1"></div>
          </div>

          <Textfield
            label="Имя"
            error={errors.username && errors.username.message}
            {...register('username', Forms.Options.Rules.User.Username)}
            onKeyDown={handleKeyDown}
          />

          <Textfield
            label="Пароль"
            type="password"
            error={errors.password && errors.password.message}
            {...register('password', Forms.Options.Rules.User.Password)}
            onKeyDown={handleKeyDown}
          />

          <Link
            href="/auth/restore"
            className="text-eilbay text-sm font-semibold text-right"
          >
            Забыли пароль?
          </Link>

          <Button
            type="submit"
            className="py-6 rounded-full bg-btnBg hover:bg-btnBgHover text-white"
            onClick={handleSubmit(onSubmit)}
            isLoading={isFetching}
          >
            Войти
          </Button>

          <Link
            href="/auth/signup"
            className="text-eilbay text-sm font-semibold text-right"
          >
            Еще нет аккаунта? Зарегистрироваться
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default Page
