import { fetcher } from '@/configs/fetcher'

const get = async () => {
  const response = await fetcher('/settings/banners/', {
    next: {
      revalidate: 1800,
    },
  })

  if (!response.ok) {
    throw new Error('Причина ошибки:' + response.statusText)
  }

  return response.json()
}

export const BannersAPI = {
  get,
}
