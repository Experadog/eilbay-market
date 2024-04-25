import { fetcher } from '@/configs/fetcher'

const getStoreReviews = async (store: string, searchParams: Record<string, string>) => {
  try {
    const response = await fetcher('/store_reviews/', {
      params: {
        shop: store,
        ordering: '-created_at',
        ...searchParams,
        limit: '10',
      },
    })

    return response.json()
  } catch (error: any) {
    throw new Error('Причина ошибки:' + error.message)
  }
}

export const ReviewsAPI = {
  getStoreReviews,
}
