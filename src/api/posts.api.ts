import { fetcher } from '@/configs/fetcher'

export const get = async (
  searchParams: Record<string, string>,
  limit: number,
) => {
  const response = await fetcher('/posts/', {
    params: { ...searchParams, limit: limit },
    next: {
      revalidate: 1800,
    },
  })

  if (!response.ok) {
    throw new Error('Причина ошибки:' + response.statusText)
  }

  return response.json()
}

export const getStorePosts = async (owner: string) => {
  try {
    const response = await fetcher('/posts/', {
      cache: 'no-cache',
      params: {
        owner,
      },
    })

    return response.json()
  } catch (error: any) {
    throw new Error('Причина ошибки:' + error.message)
  }
}

export const getSinglePost = async (id: string) => {
  try {
    const response = await fetcher(`/posts/${id}/`, { cache: 'no-cache' })

    return response.json()
  } catch (error: any) {
    throw new Error('Причина ошибки:' + error.message)
  }
}

export const getSimilarPosts = async (category: string) => {
  try {
    const response = await fetcher('/posts/', { params: { category } })

    return response.json()
  } catch (error: any) {
    throw new Error('Причина ошибки:' + error.message)
  }
}

export const PostsAPI = {
  get,
  getStorePosts,
  getSinglePost,
  getSimilarPosts,
}
