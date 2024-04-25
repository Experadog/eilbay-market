import React from 'react'

import { useColorMode } from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

import { useProductsFilter } from '@/hooks/useProductsFilter'
import { CategoriesTypes } from '@/types/categories'

const useClickOutside = (handler: () => void) => {
  const domNode = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', maybeHandler)

    return () => {
      document.removeEventListener('mousedown', maybeHandler)
    }
  })

  return domNode
}

const correctText = (text: string) => {
  return text[0].toUpperCase() + text.slice(1).toLocaleLowerCase()
}

interface Props {
  categories: CategoriesTypes.Item[]
}

const CategoryMenu = ({ categories }: Props) => {
  const [selectedCategory, setSelectedCategory] = React.useState<CategoriesTypes.Item | null>(null)
  const [clickFirstCategory, setClickFirstCategory] = React.useState<CategoriesTypes.Item | null>(null)
  const [clickSecondCategory, setClickSecondCategory] = React.useState<CategoriesTypes.Item | null>(null)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const { colorMode } = useColorMode()

  const domNode = useClickOutside(() => {
    setDropdownOpen(false)
  })

  const { createQueryString } = useProductsFilter()

  const onClickCategory = (category: CategoriesTypes.Item | null, value: string) => {
    createQueryString('category', value)
    setSelectedCategory(category)
    setDropdownOpen(false)
    setClickFirstCategory(null)
    setClickSecondCategory(null)
  }

  const onClickFirst = (category: CategoriesTypes.Item) => {
    if(category === clickFirstCategory) {
      setClickFirstCategory(null)
    } else {
      setClickFirstCategory(category)
    }

    setClickSecondCategory(null)
  }

  const onClickSecond = (category: CategoriesTypes.Item) => {
    if(category === clickSecondCategory) {
      setClickSecondCategory(null)
    } else {
      setClickSecondCategory(category)
    }
  }

  const onClickDropdown = () => {
    setDropdownOpen(prev => !prev)
    setClickFirstCategory(null)
    setClickSecondCategory(null)
  }

  return (
    <div className="w-80">
      <div className="relative w-full text-left h-full">
        <button
          onClick={onClickDropdown}
          className="flex w-full h-full items-center justify-between px-3"
        >
          <p className="capitalize">{selectedCategory?.name.toLocaleLowerCase() || 'Все'}</p>

          <IoIosArrowDown />
        </button>

        <div
          ref={domNode}
          className={twMerge(dropdownOpen ? 'top-full opacity-100 visible' : 'top-0 invisible opacity-0', colorMode === 'light' ? 'bg-white text-black' : 'bg-[#1A202C] text-white border-2', 'flex flex-col absolute z-[51] left-0 shadow-lg rounded-md w-full px-3 py-2 mt-2 transition-all')}
        >
          <button
            className="text-left capitalize"
            onClick={() => onClickCategory(null, '')}
          >
            Все
          </button>

          {categories.map((category) => (
            <div key={category.id}>
              <CategoryItem
                category={category}
                onClickCategory={onClickCategory}
                onClickOpenCategory={onClickFirst}
                openCategory={clickFirstCategory}
              />

              {
                !!clickFirstCategory?.children.length && category.children.map((category) => (
                  <div key={category.id} className="ml-5">
                    <CategoryItem
                      category={category}
                      onClickCategory={onClickCategory}
                      onClickOpenCategory={onClickSecond}
                      openCategory={clickSecondCategory}
                    />

                    {
                      !!clickSecondCategory?.children.length
                      && category.children.map((category) => (
                        <div key={category.id} className="ml-5 py-[7px]">
                          <button
                            className="text-left capitalize"
                            onClick={() => onClickCategory(category, category.id)}
                          >
                            {correctText(category.name)}
                          </button>
                        </div>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryMenu

const CategoryItem = ({
  category,
  onClickCategory,
  onClickOpenCategory,
  openCategory,
}: {
  category: CategoriesTypes.Item
  onClickCategory: (category: CategoriesTypes.Item | null, value: string) => void
  onClickOpenCategory: (category: CategoriesTypes.Item) => void
  openCategory: CategoriesTypes.Item | null
}) => {
  return (
    <div className="flex items-center justify-between text-left capitalize py-[7px]">
      <button onClick={() => onClickCategory(category, category.id)}>
        {correctText(category.name)}
      </button>

      {
        !!category.children.length && (
          <div 
            className="flex justify-end w-1/6 cursor-pointer"
            onClick={() => onClickOpenCategory(category)} 
          >
            <FaChevronRight className={twMerge('duration-200 text-xs', category === openCategory && 'rotate-90')}/>
          </div>
        )}
    </div>
  )
}
