import { proxy } from 'valtio'

import { CurrenciesTypes } from '@/types/currencies'

interface StoreTypes {
  currentCurrency: string
  exchangeRate: CurrenciesTypes.Root
}

export const CurrencyStore = proxy<StoreTypes>({
  currentCurrency: 'USD',
  exchangeRate: {
    base: 'USD',
    ms: 0,
    results: {

    },
    updated: '',
  },
})
