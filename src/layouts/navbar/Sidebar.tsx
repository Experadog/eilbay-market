'use client'

import { useCallback, useEffect, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaChevronRight } from 'react-icons/fa6'
import { RxHamburgerMenu } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { CategoriesTypes } from '@/types/categories'

interface Props {
  categories: CategoriesTypes.Item[]
}

export const Sidebar = ({ categories }: Props) => {
  const router = useRouter()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const [hoveredFirstCategory, setHoveredFirstCategory] = useState<CategoriesTypes.Item | null>(null)
  const [hoveredSecondCategory, setHoveredSecondCategory] = useState<CategoriesTypes.Item | null>(null)

  const onHoverFirst = (category: CategoriesTypes.Item) => {
    setHoveredFirstCategory(category)
    setHoveredSecondCategory(null)
  }

  const redirectToPage = (link: string) => {
    setHoveredFirstCategory(null)
    setHoveredSecondCategory(null)
    onClose()

    router.push(link)
  }

  const handleEscapePress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setHoveredFirstCategory(null)
      setHoveredSecondCategory(null)
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleEscapePress)

    return () => {
      window.removeEventListener('keydown', handleEscapePress)
    }
  }, [handleEscapePress])

  return (
    <div className="laptop:flex hidden">
      <button 
        onClick={onOpen}
        
      >
        <RxHamburgerMenu
          className="text-[25px] phone:text-[30px] tablet:text-[40px] cursor-pointer text-white"
        />
      </button>

      <div
        className={twMerge('absolute duration-300', isOpen ? 'top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-10' : '')}
        onClick={() => {
          setHoveredFirstCategory(null)
          setHoveredSecondCategory(null)
          onClose()
        }}
      />

      <div
        className={twMerge('fixed top-0 left-0 h-screen z-10 duration-300 text-black', isOpen ? 'translate-x-0' : '-translate-x-full')}
      >
        <div className="bg-white h-full shadow-lg flex">
          <div className="py-4 px-3 w-[300px]">
            <p className="text-2xl font-normal font-marmelad">Категории</p>

            <div className="space-y-2 mt-4 flex flex-col">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onMouseOver={() => onHoverFirst(category)}
                >
                  <div
                    className="flex items-center justify-between hover:bg-slate-200 hover:text-[#0D99F4] p-2 rounded-lg cursor-pointer"
                    onClick={() => redirectToPage(`/catalog/?search=&category=${category.id}`)}
                  >
                    <div className="flex items-center">
                      <Image
                        src={category.icon || '/img/category.png'}
                        alt=""
                        className="mr-2"
                        width={28}
                        height={28}
                      />

                      <p className="capitalize text-base">{category.name.toLowerCase()}</p>
                    </div>

                    {!!category.children.length && (
                      <FaChevronRight />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!!hoveredFirstCategory?.children.length && (
            <div className="py-4 px-3 w-[300px]">
              <p className="text-2xl font-normal font-marmelad capitalize">{hoveredFirstCategory.name.toLowerCase()}</p>

              <div className="space-y-2 mt-4 flex flex-col">
                {hoveredFirstCategory.children.map((category) => (
                  <div
                    key={category.id}
                    onMouseOver={() => setHoveredSecondCategory(category)}
                  >
                    <div
                      className="flex items-center justify-between hover:bg-slate-200 hover:text-[#0D99F4] p-2 rounded-lg cursor-pointer"
                      onClick={() => redirectToPage(`/catalog/?search=&category=${category.id}`)}
                    >
                      <div className="flex items-center">
                        <Image
                          src={category.icon || '/img/category.png'}
                          alt=""
                          className="mr-2"
                          width={28}
                          height={28}
                        />

                        <p className="capitalize text-base">{category.name.toLowerCase()}</p>
                      </div>

                      {!!category.children.length && (
                        <FaChevronRight />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!hoveredSecondCategory?.children.length && (
            <div className="py-4 px-3 w-[300px]">
              <p className="text-2xl font-normal font-marmelad capitalize">{hoveredSecondCategory.name.toLowerCase()}</p>

              <div className="space-y-2 mt-4 flex flex-col">
                {hoveredSecondCategory.children.map((category) => (
                  <div
                    key={category.id}
                  >
                    <div
                      className="flex items-center justify-between hover:bg-slate-200 hover:text-[#0D99F4] p-2 rounded-lg cursor-pointer"
                      onClick={() => redirectToPage(`/catalog/?search=&category=${category.id}`)}
                    >
                      <div className="flex items-center">
                        <Image
                          src={category.icon || '/img/category.png'}
                          alt=""
                          className="mr-2"
                          width={28}
                          height={28}
                        />

                        <p className="capitalize text-base">{category.name.toLowerCase()}</p>
                      </div>

                      {!!category.children.length && (
                        <FaChevronRight />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
