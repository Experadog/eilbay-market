import { fetcher } from '@/configs/fetcher'

const get = async () => {
  const response = await fetcher('/categories/', {
    next: {
      revalidate: 1800,
    },
  })

  if (!response.ok) {
    throw new Error('Причина ошибки:' + response.statusText)
  }

  return response.json()
}

const getSingleCategory = async (category: string) => {
  try {
    const response = await fetcher(`/categories/${category}/`)

    return response.json()
  } catch (error: any) {
    throw new Error('Причина ошибки:' + error.message)
  }
}

export const CategoriesAPI = {
  get,
  getSingleCategory,
}
