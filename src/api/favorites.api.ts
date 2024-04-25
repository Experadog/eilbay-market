import { cookies } from 'next/headers'

import { fetcher } from '@/configs/fetcher'

const get = async (searchParams: Record<string, string>, limit: number) => {
  const response = await fetcher('/favorites/', {
    params: { ...searchParams, limit: limit, ordering: '-created_at' },
    authorizedRequest: true,
  })

  if (!response.ok) {
    throw new Error('Причина ошибки:' + response.statusText)
  }

  return response.json()
}

const getAllList = async () => {
  const accessToken = cookies().get('accessToken')?.value

  if(!accessToken) return null

  const response = await fetcher('/favorites/', {
    authorizedRequest: true,
  })

  if (!response.ok) {
    throw new Error('Причина ошибки:' + response.statusText)
  }

  return response.json()
}

export const FavoritesAPI = {
  get,
  getAllList,
}
