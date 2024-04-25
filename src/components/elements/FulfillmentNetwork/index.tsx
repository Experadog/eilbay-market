import React from 'react'

import Image from 'next/image'

import { qr_code } from '@/images'

interface Props {
  id: number
  title: string
  code: string
}

const AddressList: Props[] = [
  {
    id: 1,
    title: 'г.Ош',
    code: 'KG',
  },
  {
    id: 2,
    title: 'г.Ташкент',
    code: 'UZ',
  },
  {
    id: 3,
    title: 'г.Алматы',
    code: 'KZ',
  },
  {
    id: 4,
    title: 'г.Москва',
    code: 'RU',
  },
  {
    id: 5,
    title: 'Польша, Германия',
    code: 'EU',
  },
  {
    id: 6,
    title: 'Европа',
    code: 'EU',
  },
  {
    id: 7,
    title: 'США',
    code: 'USA',
  },
  {
    id: 8,
    title: 'Китай',
    code: 'CHN',
  },
  {
    id: 9,
    title: 'Турция',
    code: 'TR',
  },
  {
    id: 10,
    title: 'ОАЭ',
    code: 'UAE',
  },
]

const FulfillmentNetwork = () => {
  return (
    <div className="py-7 tablet:py-20">
      <div className="flex items-center justify-center gap-4 tablet:gap-10 laptop:gap-20">
        <Image 
          src={qr_code}
          alt="qr"
          width={230}
          height={230}
          className="w-[100px] tablet:w-[230px]"
        />

        <div className="font-medium">
          <p className="text-center text-base tablet:text-2xl laptop:text-3xl mb-2 tablet:mb-4 truncate">
            Сеть Фулфилмента Eilbay
          </p>

          <div className="grid grid-rows-5 grid-flow-col gap-2 tablet:gap-4">
            {
              AddressList.map(item => (
                <p 
                  key={item.id}
                  className="text-xs tablet:text-lg tablet:truncate"
                >
                  {item.code} - {item.title}
                </p>
              ),
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default FulfillmentNetwork
