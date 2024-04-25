'use client'

import React from 'react'

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { LuSettings2 } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'

import CategoryMenu from '@/components/elements/CategoryMenu'
import { useProductsFilter } from '@/hooks/useProductsFilter'
import { CategoriesTypes } from '@/types/categories'

import Inputs from './Inputs'

// const buttonConfigs = [
//   { label: 'Дате', ascOrder: '-created_at', descOrder: 'created_at' },
//   { label: 'Оценке', ascOrder: '-rating', descOrder: 'rating' },
//   { label: 'Цене', ascOrder: '-price', descOrder: 'price' },
// ]

// const dropDownButtons = [
//   { label: 'Дешевле', ordering: 'price' },
//   { label: 'Дороже', ordering: '-price' },
//   { label: 'Выше рейтинг', ordering: 'rating' },
//   { label: 'Ниже рейтинг', ordering: '-rating' },
//   { label: 'Сбросить', ordering: '' },
// ]

interface Props {
  withInputs?: boolean
  categories?: CategoriesTypes.Item[]
  goodsAmount?: number
}

export const ProductsFilter = ({ 
  withInputs, 
  categories,
  goodsAmount,
}: Props) => {
  const popoverRef = React.useRef<HTMLDivElement | null>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function getButtonConfigsForPage(page: string) {
    switch (page) {
      case '/':
        return [
          { label: 'Дате', ascOrder: '-created_at', descOrder: 'created_at' },
          { label: 'Оценке', ascOrder: '-rating', descOrder: 'rating' },
          { label: 'Цене', ascOrder: '-price', descOrder: 'price' },
        ]
      case '/catalog/product/favorites':
        return [
          { label: 'Дате', ascOrder: '-post__created_at', descOrder: 'post__created_at' },
          { label: 'Рейтингу', ascOrder: '-post__rating', descOrder: 'post__rating' },
        ]
      default:
        return []
    }
  }
  
  function getDropDownButtonsForPage(page: string) {
    switch (page) {
      case '/':
        return [
          { label: 'Дешевле', ordering: 'price' },
          { label: 'Дороже', ordering: '-price' },
          { label: 'Выше рейтинг', ordering: '-rating' },
          { label: 'Ниже рейтинг', ordering: 'rating' },
          { label: 'Сбросить', ordering: '' },
        ]
      case '/catalog/product/favorites':
        return [
          { label: 'Дешевле', ordering: 'post__price' },
          { label: 'Дороже', ordering: '-post__price' },
          { label: 'Выше рейтинг', ordering: '-post__rating' },
          { label: 'Ниже рейтинг', ordering: 'post__rating' },
          { label: 'Сбросить', ordering: '' },
        ]
      default:
        return []
    }
  }

  const currentButtonConfigs = getButtonConfigsForPage(pathname)
  const currentDropDownButtons = getDropDownButtonsForPage(pathname)

  const { createQueryString } = useProductsFilter()

  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const createButtonHandler = (
    ascOrder: string,
    descOrder: string,
  ) => () => {
    const currentOrdering = searchParams.get('ordering')
    const newOrdering = currentOrdering === ascOrder ? descOrder : ascOrder
    createQueryString('ordering', newOrdering)
  }

  const handleClickOutsidePopover = React.useCallback((event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      onClose()
    }
  }, [onClose])

  React.useEffect(() => {
    window.addEventListener('click', handleClickOutsidePopover)

    return () => {
      window.removeEventListener('click', handleClickOutsidePopover)
    }
  }, [handleClickOutsidePopover])

  return (
    <div className="space-y-3">
      {categories && (
        <div className="flex items-center space-x-4">
          <CategoryMenu categories={categories} />

          <p className="text-sm pt-3 tablet:block hidden">{goodsAmount} товаров</p>
        </div>
      )}

      <div className="flex items-center tablet:justify-start phone:justify-between">
        <div className="flex items-center space-x-2">
          <p>Сортировать по:</p>

          {currentButtonConfigs.map(({ label, ascOrder, descOrder }) => (
            <Button
              key={label}
              variant="ghost"
              _hover={{ bg: 'inherit' }}
              className={twMerge('font-normal text-base hidden tablet:block', colorMode === 'light' ? 'text-slate-700' : 'text-white')}
              onClick={createButtonHandler(ascOrder, descOrder)}
            >
              {label}
            </Button>
          ))}
        </div>

        <div ref={popoverRef}>
          <Popover isOpen={isOpen}>
            <PopoverTrigger>
              <Button onClick={onOpen} variant="ghost">
                <LuSettings2 className={twMerge('text-2xl', colorMode === 'light' ? 'text-slate-700' : 'text-white')} />
              </Button>
            </PopoverTrigger>
            <PopoverContent w="200px">
              <PopoverArrow />
              <PopoverBody className="flex flex-col space-y-2">
                {currentDropDownButtons.map(({ label, ordering }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    _hover={{ bg: 'inherit' }}
                    className={twMerge('text-base', colorMode === 'light' ? 'text-slate-700' : 'text-white')}
                    onClick={() => {
                      createQueryString('ordering', ordering)
                      onClose()
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {withInputs && <Inputs />}
    </div>
  )
}
