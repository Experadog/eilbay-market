import React from 'react'

import { Button, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdShareAlt } from 'react-icons/io'
import { MdPhone } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

import { UsersTypes } from '@/types/users'

interface Props {
  social_owner: UsersTypes.SocialOwner[] | undefined
  phone_number: string | null
}

export const Premium = ({
  social_owner,
  phone_number,
}: Props) => {
  const path = usePathname()
  const toast = useToast()

  const onShare = () => {
    navigator.clipboard.writeText(window.location.host + path).then(function () {
      return toast({
        description: 'Ccылка успешно скопирована в буфер обмена',
        status: 'success',
        isClosable: true,
      })
    }, function (err) {
      return toast({
        description: `Произошла ошибка при копировании ссылки: ${err}`,
        status: 'success',
        isClosable: true,
      })
    })
  }

  return (
    <div className={twMerge('flex items-center justify-around mb-[15px]', (social_owner?.length && phone_number) && 'justify-end')}>
      {social_owner?.map(item => (
        <div key={item.social_type.id} className="w-full">
          <Link href={item.link} target="_blank">
            <Image
              src={`http://eilbay.com${item.social_type.logo}`}
              alt={item.social_type.title}
              width={1000}
              height={1000}
              className="w-[25px] h-[25px]"
            />
          </Link>
        </div>
      ))}

      {phone_number && (
        <div className="w-full">
          <div className="hidden tablet:block">
            <Popover>
              <PopoverTrigger>
                <Button variant="ghost" colorScheme="white" className="rounded-full">
                  <MdPhone className="text-3xl cursor-pointer mx-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Вы можете связаться с нами по номеру <span className="font-semibold">{phone_number}</span></PopoverHeader>
              </PopoverContent>
            </Popover>
          </div>
              
          <a href={`tel:${phone_number}`} className="block tablet:hidden">
            <MdPhone className="text-2xl tablet:text-3xl cursor-pointer mx-3" />
          </a>
        </div>
      )}

      <div>
        <IoMdShareAlt
          onClick={onShare}
          className="text-[35px] text-[#969595] cursor-pointer"
        />
      </div>
    </div>
  )
}
