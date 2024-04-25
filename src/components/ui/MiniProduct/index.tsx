'use client'

import React from 'react'

import { Avatar, useColorMode } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart, FaHeart } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'
import { useSnapshot } from 'valtio'

import { BASE_API_URL } from '@/configs/axios'
import { CurrencyStore } from '@/store/currency'
import { priceConverter } from '@/tools'
import { PostsTypes } from '@/types/posts'

import { Stars } from '../Stars'

export const MiniProduct = ({
  id,
  name,
  price,
  rating,
  review_count,
  images_post,
  owner,
}: PostsTypes.Item) => {
  const [inFavorite, setInFavorite] = React.useState(false)
  const { colorMode } = useColorMode()

  const { currentCurrency, exchangeRate } = useSnapshot(CurrencyStore)

  const toggleInFavorite = () => setInFavorite(prev => !prev)

  const addToFavorite = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/favorites/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          post: id,
        }),
      })

      if (response.ok) {
        toggleInFavorite()
      }
    } catch (error: any) {
      console.error('Error', error)
    }
  }
  
  return (
    <div className={twMerge('flex flex-col shadow-lg shadow-slate-300 rounded-xl overflow-hidden text-black', colorMode === 'dark' && 'shadow-slate-700 ')}>
      <Link href={`/catalog/product/view/${id}`}>
        <Image
          src={images_post[0]?.image || '/img/no-product-2.png'}
          alt={name}
          width={200}
          height={200}
          className="w-full object-cover !h-[200px]"
        />
      </Link>

      <div className="text-left p-2 tablet:p-3">
        <p className="text-[16px] tablet:text-[18px] font-semibold truncate">{name}</p>

        <p className="text-base font-medium truncate">{priceConverter(currentCurrency, exchangeRate, price)}</p>

        <div className="flex justify-between items-center">
          <Stars rating={rating} />

          <p className="text-base tablet:text-lg">{review_count}</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link href={`/catalog/store/${owner?.id}`}>
            <Avatar
              src={owner?.image}
              className="w-6 h-6"
            />
          </Link>

          <Link href="/subscribe">
            <button
              className="w-20 tablet:w-32 h-7 text-sm bg-gradient-to-r from-[#63BDFF] via-[#0075FF] to-[#1B68FF] text-white rounded-[10px]"
            >
              Premium
            </button>
          </Link>
          

          <button onClick={addToFavorite}>
            {
              inFavorite ? (
                <FaHeart className="text-xl tablet:text-2xl text-red-500" />
              ) : (
                <FaRegHeart className="text-xl tablet:text-2xl" />
              )
            }
          </button>
        </div>
      </div>
    </div>
  )
}
