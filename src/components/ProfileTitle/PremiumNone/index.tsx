'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { MdPhone } from 'react-icons/md'

const socialList = [
  {
    id: 1,
    icon: <MdPhone />,
  },
  {
    id: 2,
    icon: <FaWhatsapp />,
  },
  {
    id: 3,
    icon: <FaTelegram />,
  },
  {
    id: 4,
    icon: <FaInstagram />,
  },
]

export const NotPremium = () => {
  const router = useRouter()

  return (
    <div className="flex flex-wrap items-center justify-center laptop:justify-between w-full bg-[#58A6DF] p-5 rounded-xl gap-5">
      <div>
        <p className="text-center text-base tablet:text-xl text-[#FFFFFF] font-bold mb-5">
          Разблокируй способы связи! Подключи Eilbay Premium
        </p>
        <div className="flex justify-between tablet:gap-20">
          {
            socialList.map(item => (
              <div className="text-[#FFFFFF] text-2xl tablet:text-3xl" key={item.id}>
                {item.icon}
              </div>
            ))
          }
        </div>
      </div>

      <button 
        onClick={() => router.push('/subscribe')}
        className="w-full laptop:w-auto py-2 tablet:py-3 px-12 text-black bg-white font-semibold rounded-xl hover:text-[#58A6DF] duration-300"
      >
        Подключить
      </button>
    </div>
  )
}
