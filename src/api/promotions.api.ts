import { fetcher } from '@/configs/fetcher'

const getMy = async (owner: string) => {
  try {
    const response = await fetcher('/post_types/', {
      params: {
        owner,
      },
    })

    return response.json()
  } catch (error: any) {
    throw new Error('Причина ошибки:' + error.message)
  }
}

export const PromotionsAPI = {
  getMy,
}
