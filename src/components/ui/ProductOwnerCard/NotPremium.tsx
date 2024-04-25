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
    <div className="flex flex-col items-center justify-center gap-4 tablet:gap-5 bg-[#58A6DF] text-white p-5 rounded-xl">
      <p className="text-base tablet:text-lg font-semibold text-center">
        Разблокируй способы связи!
        Подключи <span className="font-bold">Eilbay Premium</span>
      </p>

      <div className="w-full flex items-center justify-between">
        {
          socialList.map(item => (
            <div className="text-[#FFFFFF] text-2xl tablet:text-3xl" key={item.id}>
              {item.icon}
            </div>
          ))
        }
      </div>

      <button
        onClick={() => router.push('/subscribe')}
        className="w-full py-2 bg-white text-black font-medium rounded-xl hover:text-[#58A6DF] duration-300"
      >
        Подключить
      </button>
    </div>
  )
}
