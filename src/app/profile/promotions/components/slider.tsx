'use client'

import React from 'react'

import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AiOutlineDelete } from 'react-icons/ai'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import axiosRequest from '@/configs/axios'
import { productEmpty } from '@/images'
import { PostTypes } from '@/types/post_types'

import 'swiper/css'
import 'swiper/css/pagination'

export default function Slider({ title, post_type_posts, id }: PostTypes.Item) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const breakPoints = {
    320: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
    1440: {
      slidesPerView: 5,
    },
  }

  const deletePromotion = async () => {
    try {
      await axiosRequest.delete(`/post_types/${id}/`)
      onClose()
      router.refresh()
    } catch (e) {
      throw new Error('Ошибка при удалении акции')
    }
  }
  
  return (
    <div className="flex flex-col py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-left font-semibold text-xs tablet:text-xl">
            {title}
          </p>

          {!!post_type_posts.length && (
            <Link href={`/profile/promotions/${id}`}>
              <p className="text-[#3190FF] text-xs tablet:text-base font-medium">
                смотреть все
              </p>
            </Link>
          )}
        </div>

        <Button
          className="p-2 h-auto hidden tablet:block"
          onClick={onOpen}
          variant="unstyled"
        >
          Удалить акцию
        </Button>
        <AiOutlineDelete onClick={onOpen} className="text-[26px] block tablet:hidden text-[#969595]" />
      </div>

      {!post_type_posts.length && (
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            width={1000}
            height={1000}
            src={productEmpty}
            alt="empty product"
            className="w-[55%] tablet:w-2/4 laptop:w-[35%]"
          />
          <p className="mb-2">К сожалению товары отсутствуют!</p>
          <Link
            href={'/catalog/product/'}
            className="underline text-blue-400"
          >Добавить товар</Link>
        </div>
      )}

      <Swiper
        breakpoints={breakPoints}
        spaceBetween={10}
        autoplay={{ delay: 2000 }}
        speed={500}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        className="mySwiper w-full"
      >
        {post_type_posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link href={`/catalog/product/view/${post.id}`}>
              <Image
                src={post.images_post[0]?.image || '/img/no-product-2.png'}
                alt={post.name}
                width={310}
                height={310}
                className="object-cover !w-[310px] !h-[310px] rounded-lg"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Вы уверены?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button
              className="bg-red-400 hover:bg-red-500 text-white"
              mr={3}
              onClick={deletePromotion}
            >
              Удалить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
