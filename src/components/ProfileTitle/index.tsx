'use client'

import React from 'react'

import { Avatar } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AiOutlineEdit, AiOutlineLogout } from 'react-icons/ai'
import { IoWallet } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

import { auth } from '@/configs/firebase'
import { main_icon, promotion_icon, review_icon } from '@/images'
import { UsersTypes } from '@/types/users'

import { Premium } from '../ui/ProductOwnerCard/Premium'

import { NotPremium } from './PremiumNone'

interface Props {
  user: UsersTypes.Root
  profile?: boolean
  href: string
}

const menuList = [
  {
    id: 1,
    icon: main_icon,
    path: '',
  },
  {
    id: 2,
    icon: promotion_icon,
    path: '/promotions',
  },
  {
    id: 3,
    icon: review_icon,
    path: '/reviews',
  },
]

export default function ProfileTitle({
  user,
  profile = false,
  href,
}: Props) {
  const pathname = usePathname()
  const router = useRouter()
  
  const signOutUser = () => {
    Cookies.remove('userID')
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')

    signOut(auth)

    router.push('/auth/signin')
    router.refresh()
  }

  return (
    <div className="space-y-3">
      {profile && (
        <div className="flex justify-center items-center">
          <div className="p-1 tablet:p-2 bg-[#D9D9D9] rounded-full mr-2 tablet:mr-3 cursor-pointer">
            <IoWallet className="text-[#3CABFA] text-xl tablet:text-2xl" />
          </div>

          <div>
            <p className="text-sm tablet:text-lg">Баланс счета</p>
            <p className="text-xs tablet:text-sm">{user.balance} KGS</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center">
        <p className="text-lg tablet:text-3xl font-medium pl-1">
          {user.username}
        </p>

        {profile && (
          <div className="flex items-center space-x-5 ml-auto">
            <Link href="/profile/edit" className="flex items-center cursor-pointer">
              <div className="flex items-center space-x-2">
                <AiOutlineEdit className="text-2xl" />

                <p className="hidden laptop:block text-sm">
                  Редактировать
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-2 cursor-pointer" onClick={signOutUser}>
              <AiOutlineLogout className="text-2xl" />

              <p className="hidden laptop:block text-sm">
                Выйти
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Avatar
          width="130px"
          height="130px"
          src={`http://eilbay.com${user.image}`}
          className="w-[90px] tablet:w-36 h-[90px] tablet:h-36 border-[3px] border-[#F0F0F0]"
        />

        <div className="flex items-center justify-between w-7/12 laptop:w-1/2">
          <div className="text-center">
            <p className="text-xl tablet:text-3xl font-bold">{user.posts_count}</p>
            <p className="text-xs tablet:text-lg font-medium">Товаров</p>
          </div>

          <div className="text-center">
            <p className="text-xl tablet:text-3xl font-bold">{user.rating}</p>
            <p className="text-xs tablet:text-lg font-medium">Рейтинг</p>
          </div>

          <div className="text-center">
            <p className="text-xl tablet:text-3xl font-bold">
              {user.reviews_count}
            </p>
            <p className="text-xs tablet:text-lg font-medium">
              Отзывы
            </p>
          </div>
        </div>
      </div>

      <div className="my-3 tablet:my-7 laptop:w-1/2">
        <p className="text-sm tablet:text-xl opacity-70">
          {user.user_type === '1' ? 'Админ' : 'Производитель'}
        </p>

        <p className="text-sm tablet:text-lg font-normal my-3">
          {user.description}
        </p>

        <p className="font-normal text-sm tablet:text-base">
          {user.email}
        </p>
      </div>
      
      {
        profile
          ? <Premium social_owner={user.social_owner} phone_number={user.phone_number}/>
          : user.user_status.is_premium ? (
            <Premium 
              social_owner={user.social_owner}
              phone_number={user.phone_number}
            />
          ): (
            <NotPremium />
          )
      }

      <div className="flex w-full justify-center pt-5 tablet:pt-10">
        <div className="flex w-4/5 justify-between">
          {
            menuList.map((item) => (
              <Link
                className={twMerge('pb-2 tablet:pb-4 px-5 tablet:px-10', `${href}${item.path}` === pathname && 'border-b-2 border-slate-400')}
                href={`${href}/${item.path}`}
                key={item.id}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-[25px] tablet:w-[35px] cursor-pointer"
                />
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}
