'use client'

import React from 'react'

import { Button, useColorMode } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { useProductsFilter } from '@/hooks/useProductsFilter'

export default function ReviewsFilter() {
  const { colorMode } = useColorMode()
  const searchParams = useSearchParams()
  const { createQueryString } = useProductsFilter()

  return (
    <div className="flex items-center">
      <p className={twMerge('text-base text-slate-600', colorMode === 'dark' && 'text-white')}>Сортировать по:</p>

      <Button
        variant="ghost"
        _hover={{ bg: 'inherit' }}
        className={twMerge('text-base font-normal text-slate-600', colorMode === 'dark' && 'text-white')}
        onClick={() => {
          if (searchParams.get('ordering') === 'rating') {
            createQueryString('ordering', '-rating')
          } else {
            createQueryString('ordering', 'rating')
          }
        }}
      >
        Оценке
      </Button>

      <Button
        variant="ghost"
        _hover={{ bg: 'inherit' }}
        className={twMerge('text-base font-normal text-slate-600', colorMode === 'dark' && 'text-white')}
        onClick={() => {
          if (searchParams.get('ordering') === 'created_at') {
            createQueryString('ordering', '-created_at')
          } else {
            createQueryString('ordering', 'created_at')
          }
        }}
      >
        Дате
      </Button>
    </div>
  )
}
