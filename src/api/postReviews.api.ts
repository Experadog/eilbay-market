import { fetcher } from '@/configs/fetcher'

const getPostReviews = async (post: string, searchParams: Record<string, string>) => {
  try {
    const response = await fetcher('/reviews/', {
      params: {
        post,
        ...searchParams,
        limit: '9',
      },
      cache: 'no-cache', 
    })

    return response.json()
  } catch (error: any) {
    throw new Error('Причина ошибки:' + error.message)
  }
}

export const PostReviewsAPI = {
  getPostReviews,
}
