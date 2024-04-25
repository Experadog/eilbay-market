import React from 'react'

import Image from 'next/image'

import { products_none } from '@/images'

interface Props {
  children: React.ReactNode
}

export const ProductsNotFound = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center gap-3 phone::flex-row">
      <Image 
        src={products_none}
        alt="not found"
        className="w-[200px] h-[200px] object-cover"
        width={400}
        height={400}
        priority
      />

      {children}
    </div>
  )
}
