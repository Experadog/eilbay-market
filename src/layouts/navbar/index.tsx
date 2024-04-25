'use client'

import { useState } from 'react'

import { useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BiChat } from 'react-icons/bi'
import { FaArrowRightLong, FaRegHeart } from 'react-icons/fa6'
import { FiUser } from 'react-icons/fi'
import { TbCirclePlus } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'

import { CurrenciesSelect } from '@/components/elements/CurrenciesSelect'
import Dropdown from '@/components/ui/Dropdown'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { butterfly } from '@/images'
import { useCategoriesStore } from '@/store/useCategoriesStore'
import { useCurrenciesStore } from '@/store/useCurrenciesStore'
import { CategoriesTypes } from '@/types/categories'

import Container from '../container'

import Menu from './Menu'
import { Sidebar } from './Sidebar'

export const Navbar = () => {
  const categories = useCategoriesStore(state => state.categories)
  const currencies = useCurrenciesStore(state => state.currencies)

  const { colorMode } = useColorMode()

  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState<CategoriesTypes.Item | null>(null)
  const [searchValue, setSearchValue] = useState('')

  const redirectToSearch = () => {
    if (searchValue) {
      router.push(`/catalog/?search=${searchValue}&category=${selectedCategory?.id || ''}`)
      setSearchValue('')
      setSelectedCategory(null)
    }
  }

  return (
    <nav className={twMerge('bg-lightBg bg-center bg-cover', colorMode == 'dark' && 'bg-darkBg')}>
      <Container className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-1 tablet:space-x-4">
          <Menu />

          <Sidebar categories={categories} />

          <div className="flex items-center">
            <Link href="/">
              <div className="text-white cursor-pointer">
                <div className="flex items-end gap-1">
                  <Image
                    src={butterfly}
                    alt=""
                    width={35}
                    height={35}
                    className="w-7 tablet:w-9"
                  />
                  <p className="text-lg tablet:text-2xl laptop:text-3xl font-semibold">Eilbay</p>
                </div>

                <p className="text-[12px] phone:text-[12px] tablet:text-[16px] font-semibold tracking-tighter truncate">
                  Оптовый рынок одежды
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="desktop:flex hidden w-[45%]">
          <div className="bg-[#006199] w-3/4 rounded-s-2xl text-white">
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
            type="text"
            className="w-full outline-none border-none py-2 pl-2 bg-white text-black placeholder:text-[#797979]"
            onChange={e => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Найти в Eilbay"
          />

          <div
            className="bg-white flex items-center pr-2 rounded-e-2xl"
            onClick={redirectToSearch}
          >
            <FaArrowRightLong
              className="text-2xl text-black/[0.4] cursor-pointer"
            />
          </div>
        </div>

        <div className="flex space-x-2 items-center">
          <div className="tablet:w-[100px] rounded-full overflow-hidden">
            {!!currencies?.results && <CurrenciesSelect currencies={currencies.results} />}
          </div>

          <div className="text-3xl flex text-white space-x-2 tablet:space-x-3">
            <Link
              href="https://t.me/Eldiyarom"
              target="_blank"
            >
              <BiChat />
            </Link>

            <Link
              href="/catalog/product/favorites"
              className="hidden laptop:block"
            >
              <FaRegHeart />
            </Link>

            <Link
              href="/profile/view"
              className="hidden laptop:block"
            >
              <FiUser />
            </Link>

            <Link
              href="/catalog/product"
              className="hidden laptop:block"
            >
              <TbCirclePlus />
            </Link>

            <ThemeSwitcher />
          </div>
        </div>
      </Container>
    </nav>
  )
}
