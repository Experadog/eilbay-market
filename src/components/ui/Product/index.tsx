'use client'

import React from 'react'

import { Avatar, useColorMode } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart, FaHeart } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

import { BASE_API_URL } from '@/configs/axios'
import { useCurrenciesStore } from '@/store/useCurrenciesStore'
import { priceConverter } from '@/tools'
import { FavoritesTypes } from '@/types/favorites'
import { PostsTypes } from '@/types/posts'

import { Stars } from '../Stars'

interface Props extends PostsTypes.Item {
  isInfavorites?: FavoritesTypes.Item
}

export const Product = ({
  id,
  name,
  price,
  rating,
  review_count,
  images_post,
  owner,
  isInfavorites,
}: Props) => {
  const [inFavorite, setInFavorite] = React.useState(!!isInfavorites || false)
  const [newFavoriteID, setNewFavoriteID] = React.useState<string>('')
  const { colorMode } = useColorMode()

  const { currentCurrency, exchangeRate } = useCurrenciesStore()
  
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

      const post = await response.json()
      setNewFavoriteID(post.id)

      if (response.ok) {
        toggleInFavorite()
      }

    } catch (error: any) {
      console.error('Error', error)
    }
  }

  const removeFromFavorite = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/favorites/${newFavoriteID || isInfavorites?.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
          'Content-type': 'application/json',
        },
      })
  
      if (response.ok) {
        toggleInFavorite()
      }
    } catch (error: any) {
      console.error('Error', error)
    }
  }
  
  const handleFavoriteClick = () => {
    if (inFavorite) {
      removeFromFavorite()
    } else {
      addToFavorite()
    }
  }

  return (
    <div className={twMerge('flex flex-col shadow-lg shadow-slate-300 rounded-xl overflow-hidden', colorMode === 'dark' && 'shadow-slate-700')}>
      <Link href={`/catalog/product/view/${id}`}>
        <Image
          src={images_post[0]?.image || '/img/no-product-2.png'}
          alt={name}
          width={250}
          height={250}
          className="w-full object-cover !h-[250px]"
        />
      </Link>

      <div className="text-left p-2 tablet:p-3">
        <p className="text-[16px] tablet:text-[20px] font-semibold truncate">{name}</p>

        <p className="phone:text-base tablet:text-lg font-medium truncate">{priceConverter(currentCurrency, exchangeRate, price)}</p>

        <div className="flex flex-wrap justify-between items-center">
          <Stars rating={rating} />

          <p className="text-xs">Отзывов: <span className="text-sm tablet:text-base">{review_count}</span></p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center tablet:space-x-6 space-x-1">
            <Link href={`/catalog/store/${owner?.id}`}>
              <Avatar
                src={owner?.image}
                className="tablet:w-7 w-5 tablet:h-7 h-5"
              />
            </Link>

            {
              owner?.user_status.is_premium && (
                <Link href="/subscribe">
                  <button
                    className="tablet:w-36 w-20 tablet:h-9 h-7 text-sm bg-gradient-to-r from-[#63BDFF] via-[#0075FF] to-[#1B68FF] text-white rounded-[10px]"
                  >
                    Premium
                  </button>
                </Link>
              )
            }
          </div>

          <button onClick={handleFavoriteClick}>
            {inFavorite ? (
              <FaHeart className="text-lg tablet:text-2xl text-red-500" />
            ) : (
              <FaRegHeart className="text-lg tablet:text-2xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
