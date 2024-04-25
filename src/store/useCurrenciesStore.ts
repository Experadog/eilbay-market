import { create } from 'zustand'

import { CurrenciesTypes } from '@/types/currencies'

type State = {
  currentCurrency: string
  currencies: CurrenciesTypes.Response | null
  exchangeRate: CurrenciesTypes.Root | null
}

type Actions = {
  setCurrencies: (currencies: CurrenciesTypes.Response) => void
  setExchangeRate: (exchangeRate: CurrenciesTypes.Root) => void
  setCurrentCurrency: (currentCurrency: string) => void
}

export const useCurrenciesStore = create<State & Actions>((set) => ({
  currentCurrency: 'USD',
  currencies: null,
  exchangeRate: null,

  setCurrencies: (currencies: CurrenciesTypes.Response) => set(() => ({ currencies })),
  setExchangeRate: (exchangeRate: CurrenciesTypes.Root) => set(() => ({ exchangeRate })),
  setCurrentCurrency: (currentCurrency: string) => set(() => {
    localStorage.setItem('currentCurrency', currentCurrency)

    return { currentCurrency }
  }),
}))
