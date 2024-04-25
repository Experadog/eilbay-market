import { Dispatch, useState } from 'react'

import { useColorMode } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import Dropdown from '@/components/ui/Dropdown'
import { useCurrenciesStore } from '@/store/useCurrenciesStore'

const Inputs = () => {
  const { colorMode } = useColorMode()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [price__gte, setPriceGte] = useState('')
  const [price__lte, setPriceLte] = useState('')

  const { exchangeRate, currentCurrency } = useCurrenciesStore()

  // const { currentCurrency, exchangeRate } = useSnapshot(CurrencyStore)

  const handleInputChange = (value: string, name: string, setter: Dispatch<string>) => {
    const params = new URLSearchParams(searchParams.toString())

    if (/^\d*\.?\d*$/.test(value) && exchangeRate) {
      setter(value)

      const price = +value / exchangeRate.results[currentCurrency]

      if (price === 0) {
        params.set(name, '')
        router.push('?' + params.toString())
      } else {
        params.set(name, price.toString())
        router.push('?' + params.toString())
      }
    }
  }

  return (
    <div className="grid gap-x-2 grid-cols-[repeat(4,150px)] tablet:grid-cols-[repeat(4,250px)] laptop:grid-cols-[repeat(4,1fr)] overflow-y-hidden">
      <div className="border rounded-lg">
        <Dropdown label="Товары">
          <button>Товары</button>
          <button>Заказы</button>
          <button>Поставщики</button>
          <button>Производители</button>
        </Dropdown>
      </div>

      <div className="border rounded-lg">
        <Dropdown label="Кыргызстан">
          <button>Кыргызстан</button>
          <button>Россия</button>
          <button>Казахстан</button>
          <button>Узбекистан</button>
        </Dropdown>
      </div>

      <input
        type="text"
        placeholder="Цена от"
        className={twMerge('border px-3 py-2 rounded-lg', colorMode === 'dark' && 'bg-[#1A202C] placeholder:text-white')}
        onChange={event => handleInputChange(event.target.value, 'price__gte', setPriceGte)}
        value={price__gte}
      />

      <input
        type="text"
        placeholder="Цена до"
        className={twMerge('border px-3 py-2 rounded-lg', colorMode === 'dark' && 'bg-[#1A202C] placeholder:text-white')}
        onChange={event => handleInputChange(event.target.value, 'price__lte', setPriceLte)}
        value={price__lte}
      />
    </div>
  )
}

export default Inputs
