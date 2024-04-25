'use client'

import React from 'react'

import {
  Box,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi'

import { ComplaintForm } from '@/components/forms/ComplaintForm'

import Container from '../container'

interface FooterTypes {
  id: number
  title: string
  path: string
}

const footerList: FooterTypes[] = [
  {
    id: 1,
    title: 'Фуллфилмент',
    path: '',
  },
  {
    id: 2,
    title: 'Покупателям',
    path: '',
  },
  {
    id: 3,
    title: 'Поставщикам',
    path: '',
  },
  {
    id: 4,
    title: 'Партнерам',
    path: '',
  },
  {
    id: 5,
    title: 'Pro аккаунты',
    path: '',
  },
  {
    id: 6,
    title: 'О нас',
    path: '',
  },
]

export default function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()

  return (
    <Box bg={colorMode === 'light' ? '#0678B5' : '#162038'}>
      <Container className="flex flex-wrap items-center justify-around gap-7 tablet:gap-12 text-white py-5 tablet:pt-16 tablet:pb-11">
        <div className="flex flex-col items-center">
          <Image
            src="/img/eilbay_logo.svg"
            alt="menu"
            className="w-[50px] tablet:w-[100px]"
            width={1000}
            height={1000}
          />
          <p className="text-lg tablet:text-3xl font-semibold font-urbanist tracking-widest">
            Eilbay
          </p>
        </div>

        <div className="flex flex-col items-center w-full laptop:w-auto order-3 laptop:order-none">
          <div className="w-full flex flex-wrap justify-between gap-4 mb-8 tablet:mb-16">
            <div>
              <p className="text-base tablet:text-xl font-bold">Наша почта</p>
              <div className="flex items-center gap-4 text-base mt-3">
                <HiOutlineMail />
                eilbay.world@gmail.com
              </div>
            </div>
            <div>
              <p className="text-base tablet:text-xl font-bold">Наша адрес</p>
              <div className="flex items-center gap-4 text-base mt-3">
                <HiOutlineLocationMarker />
                ул. Исанова 74
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className="text-base tablet:text-xl font-bold mb-4 tablet:mb-5">Жалобы и предложения</p>
            <button 
              onClick={onOpen}
              className="w-full text-base font-bold bg-[#0D99F4] py-2 tablet:py-3 px-2 tablet:px-20 rounded-full"
            >
              Оставить жалобу или предложение
            </button>
          </div>
        </div>

        <div className="order-2 laptop:order-none flex flex-col gap-1 tablet:gap-3">
          {
            footerList.map(({ id, title, path }) => (
              <Link 
                href={path} 
                key={id} 
                className="text-base tablet:text-xl font-semibold cursor-pointer"
              >
                {title}
              </Link>
            ))
          }
        </div>
      </Container>

      <Container className="flex items-center justify-center gap-10 text-xs tablet:text-base font-medium text-white pb-20 tablet:pb-24 pt-5 tablet:pt-8 laptop:py-8 border-t border-[#ffffff80] font-sans">
        <p>
          Политика конфидициональности
        </p>
        <p>
          Terms & Conditions
        </p>
      </Container>

      <ComplaintForm isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
