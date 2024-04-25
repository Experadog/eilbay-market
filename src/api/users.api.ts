import { cookies } from 'next/headers'

import { fetcher } from '@/configs/fetcher'

const getSingle = async (id: string) => {
  try {
    const response = await fetcher(`/accounts/users/${id}/`, {
      cache: 'no-cache',
    })

    return response.json()
  } catch (error: any) {
    throw new Error('Причина ошибки:' + error.message)
  }
}

const getMyProfile = async () => {
  const accessToken = cookies().get('accessToken')?.value

  if(!accessToken) return null

  const response = await fetcher('/accounts/users/get_userinfo', {
    authorizedRequest: true,
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error('Причина ошибки:' + response.statusText)
  }
  
  return response.json()
}

export const UsersAPI = {
  getSingle,
  getMyProfile,
}
