'use client'

import React from 'react'

import {
  Button,
} from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Image from 'next/image'

import axiosRequest, { BASE_API_URL } from '@/configs/axios'
import { UsersTypes } from '@/types/users'

import Form from './form'

const getUserBanner = async (user: string) => {
  const res = await fetch(`${BASE_API_URL}/accounts/banners/?user=${user}`)

  if (!res.ok) throw new Error('Ошибка при получении баннера!')

  return res.json()
}

export interface Response {
  count: number
  next: any
  previous: any
  results: UsersTypes.UserBanner[]
}

export default function Banner() {
  const [userID, setUserID] = React.useState('')
  const [banner, setBanner] = React.useState<Response>()

  const deleteBanner = async (id: number) => {
    try {
      await axiosRequest.delete(`/accounts/banners/${id}`)

      await getUserBanner(userID)
        .then(res => setBanner(res))
    } catch (error) {
      throw new Error('Ошибка при удалении баннер')
    }
  }

  const createBanner = async (banner: File[]) => {
    const formData = new FormData()

    if (banner) {
      formData.append('banner', banner[0])
    }

    try {
      await axiosRequest.post('/accounts/banners/', formData)

      await getUserBanner(userID)
        .then(res => setBanner(res))
    } catch (error) {
      throw new Error('Ошибка при создании баннера')
    }
  }

  React.useEffect(() => {
    if (userID) {
      getUserBanner(userID)
        .then(res => setBanner(res))
    }
  }, [userID])

  React.useEffect(() => {
    setUserID(Cookies.get('userID') || '')
  }, [])

  return (
    <div>
      {banner && (
        banner.results.map(({ id, banner }) => (
          <div
            key={id}
            className="flex flex-col"
          >
            <Image
              src={banner}
              alt=""
              width={1000}
              height={600}
              className="h-96 w-full rounded-xl"
              priority
            />
            <Button 
              className="bg-red-400 hover:bg-red-500 text-white"
              onClick={() => deleteBanner(id)}
            >
              Удалить
            </Button>
          </div>
        ))
      )}

      {banner && !banner.count && (
        <Form createBanner={createBanner} />
      )}
    </div>
  )
}
