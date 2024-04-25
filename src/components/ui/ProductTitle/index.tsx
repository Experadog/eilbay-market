'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { AiOutlineEdit } from 'react-icons/ai'

import { PageTitle } from '@/components/elements/PageTitle'
import { UsersTypes } from '@/types/users'

import { Stars } from '../Stars'

interface Props {
  canEdit?: boolean
  post_id?: string
  owner: UsersTypes.Item
  name: string
  product_number: number
  rating: number
}

export const ProductTitle = ({
  canEdit,
  post_id,
  owner,
  name,
  product_number,
  rating,
}: Props) => {
  const router = useRouter()

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle leftButton />
        {canEdit && (
          <button 
            className="flex items-center space-x-2 px-3 py-1 hover:bg-slate-100 rounded-md"
            onClick={() => router.push(`/catalog/product/edit/${post_id}`)}
          >
            <AiOutlineEdit className="text-2xl" />

            <p className="hidden tablet:block">Редактировать</p>
          </button>
        )}
      </div>

      <div>
        <p className="font-medium text-base tablet:text-2xl">
          <span className="capitalize font-semibold">{owner.username || 'Аноним'}</span> / {name}
        </p>

        <div className="flex items-center text-sm gap-9 mt-3">
          <div className="w-[200px]">
            <Stars rating={rating} />
          </div>

          <p className="text-xs tablet:text-sm">
            Арт: <span className="text-[#0D99F4]">{product_number}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
