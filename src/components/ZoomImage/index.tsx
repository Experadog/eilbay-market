import React, { useState } from 'react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import Image from 'next/image'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'

import { noProduct } from '@/images'
import { PostsTypes } from '@/types/posts'

import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

interface ZoomProps {
  images: PostsTypes.Image[] | undefined
  isOpen: boolean
  onClose: () => void
}

export const ZoomImage: React.FC<ZoomProps> = ({ images, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'full'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton className="fixed" />
        <ModalBody className="w-full tablet:w-11/12 laptop:w-4/5 m-auto flex items-center justify-center p-0">
          <div className="hidden laptop:flex flex-wrap gap-2 laptop:gap-3 justify-center w-full">
            {
              images?.map(({ id, image }) => (
                <BrokenImageChecker
                  key={id}
                  src={image}
                  alt="product"
                />
              ))
            }
          </div>

          <div className="block laptop:hidden w-full h-[85vh]">
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={10}
              autoplay={{ delay: 2000 }}
              speed={1000}
              loop={true}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                type: 'fraction',
                dynamicBullets: true,
              }}
            >
              {
                images?.map(({ id, image }) => (
                  <SwiperSlide className="rounded-[8px]" key={id}>
                    <Image
                      src={image}
                      alt="product image"
                      width={500}
                      height={500}
                      className="w-full h-full"
                    />
                  </SwiperSlide>
                ))
              }

              <div className="swiper-pagination !text-[#0678B5] font-bold"></div>
            </Swiper>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const BrokenImageChecker = ({ src, alt }: { src: string, alt: string }) => {
  const [imageError, setImageError] = useState(false)

  const handleError = () => {
    setImageError(true)
  }

  return (
    <Image
      src={imageError ? noProduct : src}
      alt={alt}
      onError={handleError}
      width={450}
      height={600}
      className="w-[49%] laptop-height:h-auto h-[95vh] object-cover"
    />
  )
}
