import React from 'react'

import { useRouter } from 'next/navigation'
import { FaArrowRightLong } from 'react-icons/fa6'

import { CategoriesTypes } from '@/types/categories'

interface Props {
  categories: CategoriesTypes.Item[]
}

export const SearchInput = ({ categories }: Props) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('')

  const router = useRouter()

  const redirectToSearchPage = (search: string, category: string) => {
    if (search) {
      router.push(`/catalog/?search=${search}&category=${category}`)
    }
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      redirectToSearchPage(searchValue, selectedCategory)
    }
  }

  return (
    <div className="rounded-full overflow-hidden flex desktop:w-4/6 desktop:mx-auto">
      <div className="w-2/3">
        <select
          className="outline-none bg-[#006199] text-white py-2 px-4 w-full capitalize"
          onChange={e => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Все</option>
          {categories.map(({ id, name }) => (
            <option
              key={id}
              value={id}
            >{name.toLowerCase()}</option>
          ))}
        </select>
      </div>

      <input
        className="py-1 px-2 bg-white placeholder:text-slate-500 w-full"
        type="text"
        placeholder="Найти на Eilbay"
        onChange={e => setSearchValue(e.target.value)}
        value={searchValue}
        onKeyDown={handleEnterPress}
      />

      <div
        className="bg-white flex items-center pr-2"
        onClick={() => redirectToSearchPage(searchValue, selectedCategory)}
      >
        <FaArrowRightLong
          className="text-2xl text-black/[0.4]  cursor-pointer"
        />
      </div>
    </div>
  )
}
