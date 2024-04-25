import { fetcher } from '@/configs/fetcher'

const get = async () => {
  const response = await fetcher('/wallet_histories/', {
    next: {
      revalidate: 1800,
    },
    authorizedRequest: true,
  })

  if (!response.ok) {
    throw new Error('Причина ошибки:' + response.statusText)
  }

  return response.json()
}

export const WalletHistoriesAPI = {
  get,
}
