'use client'

import React from 'react'

import { 
  Button, 
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Container from '@/layouts/container'

export default function Page() {
  const router = useRouter()

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

          <p className="text-2xl text-center pb-2 font-medium">
            Ваш e-mail успешно подтвержден!
          </p>

          <Button
            className="rounded-full bg-btnBg hover:bg-btnBgHover py-6 text-white"
            colorScheme="blue"
            type="submit"
            onClick={() => router.push('/auth/signin')}
          >
            Войти
          </Button>
        </div>
      </div>
    </Container>
  )
}
