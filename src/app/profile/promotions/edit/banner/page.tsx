'use client'
import React from 'react'

import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'

import Container from '@/layouts/container'

import Banner from './banner'

export default function Page() {
  return (
    <Container>
      <div className="py-10 relative flex items-center">
        <Link
          href="/profile/promotions"
          className="text-opacity-30 flex items-center"
        >
          <FaArrowLeftLong className="mr-3" /> Назад
        </Link>

        <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-medium text-[25px]">
          Редактирование постера
        </p>
      </div>

      <div className="w-full">
        <Banner  />
      </div>
    </Container>
  )
}
