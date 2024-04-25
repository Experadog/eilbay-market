'use client'

import { useCallback, useEffect, useState } from 'react'


import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import { Loader } from '@/components/ui/Loader'
import axiosRequest from '@/configs/axios'
import { useCategoriesStore } from '@/store/useCategoriesStore'
import { useCurrenciesStore } from '@/store/useCurrenciesStore'
import { useUserStore } from '@/store/useUserStore'
import { CategoriesTypes } from '@/types/categories'
import { CurrenciesTypes } from '@/types/currencies'
import { UsersTypes } from '@/types/users'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isPageLoading, setIsPageLoading] = useState(true)

  const setCategories = useCategoriesStore(state => state.setCategories)
  const setCurrencies = useCurrenciesStore(state => state.setCurrencies)
  const setExchangeRate = useCurrenciesStore(state => state.setExchangeRate)
  const setCurrentCurrency = useCurrenciesStore(state => state.setCurrentCurrency)
  const setUserToStore = useUserStore(state => state.setUser)
  const signIn = useUserStore(state => state.signIn)

  const getCategories = useCallback(async () => {
    try {
      const { data: categories } = await axiosRequest.get<CategoriesTypes.Item[]>('/categories/')
      setCategories(categories)

      const { data: currencies } = await axiosRequest.get<CurrenciesTypes.Response>('/settings/currencies/')
      setCurrencies(currencies)

      if (currencies) {
        const currenciesKeys = currencies.results.map(item => item.name).join(',')
        const API_KEY = '659f39f06d-f79e395941-sc2p1s'
        const response: CurrenciesTypes.Root = await (await fetch(`https://api.fastforex.io/fetch-multi?from=USD&to=${currenciesKeys}&api_key=${API_KEY}`)).json()
        setExchangeRate(response)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsPageLoading(false)
    }
  }, [setCategories, setCurrencies, setExchangeRate])

  const getUser = useCallback(async () => {
    try {
      const { data } = await axiosRequest.get<UsersTypes.Root>('/accounts/users/get_userinfo/')

      setUserToStore(data)
      signIn()
    } catch (error) {
      console.error(error)
    }
  }, [setUserToStore, signIn])

  useEffect(() => {
    if (localStorage.getItem('currentCurrency')) {
      setCurrentCurrency(localStorage.getItem('currentCurrency') || 'USD')
    }

    getCategories()
  }, [getCategories, setCurrentCurrency])

  useEffect(() => {
    getUser()
  }, [getUser])

  if (isPageLoading) return <Loader />
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  )
}
