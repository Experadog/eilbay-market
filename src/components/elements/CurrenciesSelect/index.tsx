'use client'

import React from 'react'

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { useCurrenciesStore } from '@/store/useCurrenciesStore'
import { CurrenciesTypes } from '@/types/currencies'

interface Props {
  currencies: CurrenciesTypes.Item[]
  menu?: boolean
}

export const CurrenciesSelect = ({ currencies, menu }: Props) => {
  const { setCurrentCurrency, currentCurrency } = useCurrenciesStore()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const activeCurrenciesImage = currencies.find(item => item.name === currentCurrency)

  const onChangeCurrency = (name: string) => {
    setCurrentCurrency(name)
    onClose()
  }

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          className={twMerge('w-full gap-2 bg-transparent text-sm tablet:text-lg', menu ? 'bg-none text-[#888888]' : 'bg-white text-black')}
          onClick={onOpen}
        >
          {activeCurrenciesImage && (
            <Image
              width={28}
              height={28}
              alt="flag"
              src={activeCurrenciesImage.flag}
              className="w-5 tablet:h-7 h-5 tablet:w-7"
            />
          )}

          {currentCurrency}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-xl">
        <PopoverArrow />
        <PopoverBody className="p-1">
          {currencies.map(({
            id,
            flag,
            name,
          }) => (
            <Button
              key={id}
              className="cursor-pointer flex items-center gap-2 my-1"
              onClick={() => onChangeCurrency(name)}
            >
              <Image
                alt="flag"
                src={flag}
                width={28}
                height={28}
                className="w-5 tablet:h-7 h-5 tablet:w-7"
              />
              {name}
            </Button>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
