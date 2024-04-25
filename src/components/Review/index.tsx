'use client'

import React from 'react'

import {
  Avatar,
  Box,
  Flex,
  Text,
  WrapItem,
  useColorMode,
} from '@chakra-ui/react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { dateConverter } from '@/tools'
import { ReviewsTypes } from '@/types/reviews'

import { Stars } from '../ui/Stars'

interface Props {
  id: number
  user: ReviewsTypes.User
  review: string
  stars: number
  created_at: string
}

export const Review = ({
  id,
  created_at,
  review,
  stars,
  user,
}: Props) => {
  const { colorMode } = useColorMode()

  return (
    <Flex className="gap-[15px] tablet:gap-[25px] py-3 tablet:py-5 border-b-[2px] border-[#EAE8EB]">
      <WrapItem>
        <Link href={`/catalog/store/${user.id}`}>
          <Avatar
            key={id}
            src={`http://eilbay.com${user.image}`}
            className="w-[50px] tablet:w-[60px] h-[50px] tablet:h-[60px] cursor-pointer"
          />{' '}
        </Link>
      </WrapItem>
      <Box className="w-full">
        <Flex className="align-items gap-[20px] tablet:gap-[30px] text-base tablet:text-lg font-medium tracking-tight">
          <Link 
            href={`/catalog/store/${user.id}`} 
            key={`username-${id}`} 
            className="text-base tablet:text-xl cursor-pointer"
          >
            {user.username || 'no username'}
          </Link>

          <Text className={twMerge('text-[12px] tablet:text-[20px]', colorMode === 'light' ? 'text-[#808080]' : 'text-white')}>
            {dateConverter(created_at)}
          </Text>
        </Flex>

        <div>
          <Stars rating={stars} />
        </div>

        <Text className="pt-[5px] text-base text-[12px] tablet:tablet:text-[16px] tablet:text-[20px] tablet:text-lg font-medium tracking-tight">
          {review}
        </Text>
      </Box>
    </Flex>
  )
}
