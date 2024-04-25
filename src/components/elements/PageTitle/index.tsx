'use client'

import React from 'react'

import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'

interface Props {
  leftButton?: boolean
  rightButton?: React.ReactNode
  title?: string
}

export const PageTitle = ({ 
  leftButton, 
  title, 
  rightButton,
}: Props) => {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between mb-6 mt-1 relative w-full">
      <div>
        {leftButton && (
          <Button
            className="dark:text-slate-300 dark:hover:text-slate-700 text-sm tablet:text-lg"
            leftIcon={<IoArrowBackOutline />}
            variant="ghost"
            onClick={() => router.back()}
          >
            Назад
          </Button>
        )}
      </div>
      <p className="absolute left-1/2 -translate-x-1/2 text-sm tablet:text-2xl font-[600] dark:text-slate-300">{title}</p>
      <div>
        {rightButton} 
      </div>
    </div>
  )
}
