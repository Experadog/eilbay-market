'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

import { CategoriesTypes } from '@/types/categories'

import Dropdown from '../ui/Dropdown'

interface Props {
  categories: CategoriesTypes.Item[]
}

const SearchInput = ({ categories }: Props) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<CategoriesTypes.Item | null>(null)

  const router = useRouter()

  const redirectToSearch = () => {
    if (searchValue) {
      router.push(`/catalog/?search=${searchValue}&category=${selectedCategory?.id || ''}`)
      setSearchValue('')
      setSelectedCategory(null)
    }
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      redirectToSearch()
    }
  }

  return (
    <div className="desktop:hidden flex laptop:w-4/6 mx-auto">
      <div className="bg-[#58A6DF] w-3/4 rounded-s-xl text-white">
        <Dropdown label={selectedCategory?.name || 'Все'}>
          <button
            className="text-left capitalize"
            onClick={() => setSelectedCategory(null)}
          >
            Все
          </button>

          {categories.map((category) => (
            <button
              className="text-left capitalize"
              key={category.id}
              onClick={() => setSelectedCategory(category)}
            >
              {category.name.toLocaleLowerCase()}
            </button>
          ))}
        </Dropdown>
      </div>

      <input
        placeholder="Найти в Eilbay"
        type="text"
        className="w-full outline-none py-2 pl-2 bg-white text-black placeholder:text-[#797979] border-y-2 border-[#58A6DF]"
        onChange={e => setSearchValue(e.target.value)}
        value={searchValue}
        onKeyDown={handleEnterPress}
      />

      <div
        className="bg-[#58A6DF] flex items-center px-4 py-2 rounded-e-xl"
        onClick={redirectToSearch}
      >
        <FaSearch
          className="text-2xl text-white cursor-pointer"
        />
      </div>
    </div>
  )
}

export default SearchInput
