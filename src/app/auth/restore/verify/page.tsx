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

import Container from '@/layouts/container'

export default function Page() {
  const [isFetching, setIsFetching] = React.useState(false)
  const { colorMode } = useColorMode()

  const router = useRouter()
  const toast = useToast()

  const handlePinInputChange = async (token: string) => {
    if (token.length === 6) {
      setIsFetching(true)

      try {
        const response = await fetch('/api/auth/restore/verify/', {
          method: 'POST',
          body: JSON.stringify({
            token,
          }),
        })

        if (!response.ok) {
          toast({
            title: 'Неправильный код подтверждения!',
            status: 'error',
            duration: 2500,
            isClosable: true,
            position: 'bottom',
          })
        }

        if (response.ok) {
          const user = await response.json()

          router.push(`/auth/restore/change_password/${user.id}`)
        }
      } catch (error: any) {
        console.error('Error', error)
      } finally {
        setTimeout(() => setIsFetching(false), 1000)
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

          <p className="text-3xl text-center pb-6 font-medium">
            Восстановление пароля
          </p>

          <p className="text-sm font-semibold text-center">
            Шаг 2 / 3
          </p>

          <p className="text-center font-medium">
            Введите код, отправленный на Ваш e-mail
          </p>

          <div className="flex justify-center pb-8">
            <PinInput
              onChange={handlePinInputChange}
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
