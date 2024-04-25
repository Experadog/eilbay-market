'use client'

import React from 'react'

import { Button, Image } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import Container from '@/layouts/container'

export default function Page() {
  const router = useRouter()

  return (
    <Container className="flex flex-col items-center justify-center h-[80vh] tablet:h-[90vh]">
      <div className="text-center">
        <div className="flex justify-center items-center">
          <Image
            src="/img/eilbay_logo.svg"
            alt="Eilbay"
            width={25}
            height={30}
          />
          <p className="text-lg tablet:text-2xl ml-[5px] font-marmelad">Eilbay</p>
        </div>

        <p className="text-[20px] tablet:text-[28px] font-semibold text-center leading-none my-6 tablet:my-8">
          Ваш e-mail успешно обновлен!
        </p>

        <Button 
          colorScheme="telegram"
          className="rounded-full text-[14px] tablet:text-[16px] py-6 tablet:py-7 tablet:px-14"
          onClick={() => router.push('/profile/edit')}
        >
          Вернуться на страницу редактирования
        </Button>
      </div>
    </Container>
  )
}

