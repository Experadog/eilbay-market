'use client'

import React from 'react'

import { Avatar } from '@chakra-ui/react'
import Link from 'next/link'
import { useSnapshot } from 'valtio'

import { CurrencyStore } from '@/store/currency'
import { priceConverter } from '@/tools'
import { UsersTypes } from '@/types/users'

import { NotPremium } from './NotPremium'
import { Premium } from './Premium'

interface Props {
  owner: UsersTypes.Item
  price: string
}

export const ProductOwnerCard = ({
  owner,
  price,
}: Props) => {
  const { currentCurrency, exchangeRate } = useSnapshot(CurrencyStore)
  const productPrice = priceConverter(currentCurrency, exchangeRate, price)
  const is_premium = true

  return (
    <div className="shadow-lg py-5 px-3 rounded-2xl border space-y-4">
      <div className="flex items-center space-x-3">
        <Link href={`/catalog/store/${owner.id}`}>
          <div className="flex items-center gap-x-3">
            <Avatar
              src={`http://eilbay.com${owner.image}` || ''}
              size="md"
            />

            <p className="text-base font-[600] capitalize">
              {owner.username || 'Аноним'}
            </p>
          </div>
        </Link>

        <p className="text-sm font-medium opacity-70">
          Рейтинг : {owner.rating || '0'}
        </p>
      </div>

      <p className="text-sm tablet:text-xl laptop:text-2xl font-semibold tracking-tight">
        {productPrice < '1' ? 'Договорная' : productPrice}
      </p>

      <div>
        {
          is_premium ? (
            <Premium 
              social_owner={owner.social_owner} 
              phone_number={owner.phone_number}
            />
          ) : (
            <NotPremium />
          )
        }
      </div>
    </div>
  )
}
