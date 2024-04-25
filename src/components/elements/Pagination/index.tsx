'use client'

import React from 'react'

import {
  Button,
} from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  currentPage: number
  totalPages: number
  limit: number
  postsCount: number
}

export const Pagination = ({
  currentPage,
  totalPages,
  limit,
  postsCount,
}: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  // const dotes = () => (
  //   <div className="flex items-center space-x-1" key={new Date().valueOf()}>
  //     <div className="w-2 h-2 rounded-full bg-slate-400"></div>
  //     <div className="w-2 h-2 rounded-full bg-slate-400"></div>
  //     <div className="w-2 h-2 rounded-full bg-slate-400"></div>
  //   </div>
  // )

  const changeCurrentPage = (page: number) => {
    const newOffset = String((page - 1) * limit)

    const params = new URLSearchParams(searchParams.toString())
    params.set('offset', newOffset)

    router.replace('?' + params.toString())
  }

  const result = []

  for (let i = Math.max(1, currentPage - 2); i < currentPage; i++) {
    result.push(
      <Button
        key={i}
        onClick={() => changeCurrentPage(i)}
        className="border border-slate-400 text-slate-400"
      >
        {i}
      </Button>,
    )
  }

  result.push(
    <Button
      key={currentPage}
      variant="solid"
      className="bg-btnBg hover:bg-btnBgHover text-white"
    >
      {currentPage}
    </Button>,
  )

  for (let i = currentPage + 1; i <= Math.min(totalPages, currentPage + 2); i++) {
    result.push(
      <Button
        key={i}
        onClick={() => changeCurrentPage(i)}
        className="border border-slate-400 text-slate-400"
      >
        {i}
      </Button>,
    )
  }

  if (postsCount > limit) return (
    <div className="flex justify-center items-center space-x-4">
      {result}
    </div>
  )
}
