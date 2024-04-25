'use client'

import React from 'react'

import {
  Button,
  PinInput,
  PinInputField,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import axiosRequest from '@/configs/axios'
import Container from '@/layouts/container'

export default function Page() {
  const [isFetching, setIsFetching] = React.useState(false)
  const [errorResponse, setErrorResponse] = React.useState(false)
  const { colorMode } = useColorMode()
  const router = useRouter()
  const toast = useToast()

  const handlePinInputChange = async (token: string) => {
    setErrorResponse(false)

    if (token.length === 6) {
      setIsFetching(true)

      try {
        await axiosRequest.post('/accounts/users/account_activate/', {
          token,
        })

        router.push('/auth/signin')
      } catch (e) {
        setErrorResponse(true)
        toast({
          title: 'Неправильный код верификации!',
          status: 'error',
          duration: 2500,
          isClosable: true,
          position: 'bottom',
        })
      } finally {
        setTimeout(() => setIsFetching(false), 500)
      }
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

          <p className="text-3xl text-center pb-2 font-medium">
            Добро пожаловать!
          </p>

          <p className="text-sm font-semibold text-center">
            Шаг 2 / 2
          </p>

          <p className="text-center font-medium">
            Введите код, отправленный на Ваш e-mail
          </p>

          <div className="flex justify-center pb-8">
            <PinInput 
              onChange={handlePinInputChange}
              isInvalid={errorResponse}
            >
              <PinInputField className={twMerge('mx-1', colorMode === 'light' ? 'border-slate-600' : 'border-slate-200 placeholder:text-white')} />
              <PinInputField className={twMerge('mx-1', colorMode === 'light' ? 'border-slate-600' : 'border-slate-200 placeholder:text-white')} />
              <PinInputField className={twMerge('mx-1', colorMode === 'light' ? 'border-slate-600' : 'border-slate-200 placeholder:text-white')} />
              <PinInputField className={twMerge('mx-1', colorMode === 'light' ? 'border-slate-600' : 'border-slate-200 placeholder:text-white')} />
              <PinInputField className={twMerge('mx-1', colorMode === 'light' ? 'border-slate-600' : 'border-slate-200 placeholder:text-white')} />
              <PinInputField className={twMerge('mx-1', colorMode === 'light' ? 'border-slate-600' : 'border-slate-200 placeholder:text-white')} />
            </PinInput>
          </div>

          <Button
            className="bg-btnBg hover:bg-btnBgHover py-6 rounded-full text-white"
            isLoading={isFetching}
            onClick={() => handlePinInputChange}
          >
            Подтвердить e-mail
          </Button>
        </div>
      </div>
    </Container>
  )
}
