'use client'

import { useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io'
import { TbListSearch } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'

import { CategoriesTypes } from '@/types/categories'

interface Props {
  categories: CategoriesTypes.Item[]
}

export const BottomSidebar = ({ categories }: Props) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [currentPage, setCurrentPage] = useState(1)
  const [firstCategory, setFirstCategory] = useState<CategoriesTypes.Item | null>(null)
  const [secondCategory, setSecondCategory] = useState<CategoriesTypes.Item | null>(null)

  const onClickFirst = (category: CategoriesTypes.Item) => {
    setFirstCategory(category)
    setSecondCategory(null)
  }

  const redirectToPage = (link: string) => {
    setFirstCategory(null)
    setSecondCategory(null)
    onClose()
    setCurrentPage(1)

    router.push(link)
  }

  const nextPage = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div>
      <button
        onClick={onOpen}
      >
        <TbListSearch
          className="text-white text-[24px] tablet:text-[34px]"
        />
      </button>

      <div
        className={twMerge('absolute duration-300', isOpen ? 'top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-10' : '')}
        onClick={() => {
          onClose()
        }}
      />

      <div className={twMerge('fixed top-0 left-0 w-full h-screen z-10 duration-300 text-black', isOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="bg-white h-full shadow-lg flex">
          <div className="my-4 mx-3 w-full overflow-hidden">
            <div className="relative">
              <IoMdClose
                onClick={onClose}
                className="absolute text-2xl top-1 right-2 z-10 cursor-pointer"
              />
            </div>

            <div className="duration-300 w-full flex" style={{ marginLeft: `calc(-100% * ${currentPage - 1})` }}>
              {/* Здесь содержимое страниц */}
              <div className="min-w-full">
                <p className="text-center text-2xl font-normal font-marmelad mb-3">
                  Категории
                </p>
                <div className="h-[100vh] overflow-y-scroll space-y-2 flex flex-col">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => {
                        onClickFirst(category)
                      }}
                    >
                      <div
                        className="flex items-center justify-between bg-[#e7f7fd] p-2 rounded-lg cursor-pointer"
                        onClick={() => {
                          category.children.length
                            ? nextPage()
                            : redirectToPage(`/catalog/?search=&category=${category.id}`)
                        }}
                      >
                        <div className="flex items-center">
                          <Image
                            src={category.icon ? category.icon : '/img/category.png'}
                            alt="category"
                            width={28}
                            height={28}
                          />
                          <p className="font-medium ml-3">
                            {category.name.toLowerCase()}
                          </p>
                        </div>
                        {!!category.children.length && (
                          <IoIosArrowForward className="text-[#737d9b]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>

              {!!firstCategory?.children.length && (
                <div className="min-w-full">
                  <>
                    <div className="relative flex items-center justify-center mb-3">
                      <button 
                        className="absolute left-0 text-2xl"
                        onClick={prevPage} 
                        disabled={currentPage === 1}
                      >
                        <IoIosArrowBack />
                      </button>
                      <p className="text-2xl font-normal font-marmelad">{firstCategory?.name.toLocaleLowerCase()}</p>
                    </div>
                    {firstCategory?.children.map((item) => (
                      <div
                        onClick={() => setSecondCategory(item)}
                        key={item.id}
                      >
                        <div
                          onClick={() => {
                            item?.children.length
                              ? nextPage()
                              : redirectToPage(`/catalog/?search=&category=${item.id}`)
                          }}
                          key={item.id}
                          className="flex items-center justify-between bg-[#e7f7fd] p-5 rounded-2xl my-2"
                        >
                          <div className="flex items-center">
                            <Image
                              src={item.icon ? item.icon : '/img/category.png'}
                              alt="category"
                              width={28}
                              height={28}
                            />
                            <p className="font-medium ml-3">
                              {item.name.toLowerCase()}
                            </p>
                          </div>
                          {!!item.children.length && (
                            <IoIosArrowForward className="text-[#737d9b]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              )}

              {!!secondCategory?.children.length && (
                <div className="min-w-full">
                  <>
                    <div className="relative flex items-center justify-center mb-3">
                      <button 
                        className="absolute left-0 text-2xl"
                        onClick={prevPage} 
                        disabled={currentPage === 1}
                      >
                        <IoIosArrowBack />
                      </button>
                      <p className="text-2xl font-normal font-marmelad">{secondCategory?.name.toLocaleLowerCase()}</p>
                    </div>
                    {secondCategory?.children.map((item) => (
                      <div
                        onClick={() => redirectToPage(`/catalog/?search=&category=${item.id}`)
                        }
                        key={item.id}
                        className="flex items-center justify-between bg-[#e7f7fd] p-5 rounded-2xl my-2"
                      >
                        <div className="flex items-center">
                          <Image
                            src={item.icon ? item.icon : '/img/category.png'}
                            alt="category"
                            width={28}
                            height={28}
                          />
                          <p className="font-medium ml-3">
                            {item.name.toLowerCase()}
                          </p>
                        </div>
                        {!!item.children.length && (
                          <IoIosArrowForward className="text-[#737d9b]" />
                        )}
                      </div>
                    ))}
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
