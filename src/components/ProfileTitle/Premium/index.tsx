'use client'

import React from 'react'

import { 
  Button, 
  Popover, 
  PopoverArrow, 
  PopoverCloseButton, 
  PopoverContent, 
  PopoverHeader, 
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdShareAlt } from 'react-icons/io'
import { MdPhone } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

import { UsersTypes } from '@/types/users'

export const IsPremium = ({ 
  user, 
  windowWidth, 
}: { 
  user: UsersTypes.Root | undefined
  windowWidth: number
}) =>  {
  const path = usePathname()
  const toast = useToast()

  const onShare = () => {
    navigator.clipboard.writeText(window.location.host + path).then(function() {
      return toast({
        description: 'Текст успешно скопирован в буфер обмена',
        status: 'success',
        isClosable: true,
      })
    }, function(err) {
      return toast({
        description: `Произошла ошибка при копировании текста: ${err}`,
        status: 'success',
        isClosable: true,
      })
    })
  }

  return (
    <div className={twMerge('flex w-full justify-between items-center', (!user?.social_owner.length && !user?.phone_number) && 'justify-end')}>
      {
        user?.social_owner?.map(({ link, social_type, id }) => (
          <Link
            href={link}
            key={id}
            target="_blank"
          >
            <Image
              src={social_type.logo}
              width={30}
              height={30}
              alt="icon"
              className="w-[25px] tablet:w-[30px] h-[25px] tablet:h-[30px] cursor-pointer"
            />
          </Link>
        ))
      }

      {user?.phone_number && (
        <div className={windowWidth > 500 ? 'lg:w-1/2' : 'sm:w-1/2'}>
          <div>
            {windowWidth > 500 ? (
              <Popover>
                <PopoverTrigger>
                  <Button variant="ghost" colorScheme="white" className="rounded-full">
                    <MdPhone className="text-3xl cursor-pointer mx-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Вы можете связаться с нами по номеру <span className="font-semibold">{user?.phone_number}</span></PopoverHeader>
                </PopoverContent>
              </Popover>
            ) : (
              <a href={`tel:${user.phone_number}`}>
                <MdPhone className="text-2xl tablet:text-3xl cursor-pointer mx-3" />
              </a>
            )}
          </div>
        </div>
            
      )}

      <IoMdShareAlt
        onClick={onShare}
        className="text-4xl text-[#969595] cursor-pointer"
      />
    </div>
  )
}
