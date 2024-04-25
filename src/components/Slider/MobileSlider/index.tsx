import React from 'react'

import Image from 'next/image'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'

import { PostsTypes } from '@/types/posts'

import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

interface MobileProps {
  images: PostsTypes.Image[] | undefined
  removeButton?: boolean
  addImage?: boolean
  postID?: string
  onOpen: () => void
  RemoveImageButton: ({ image }: { image: PostsTypes.Image }) => React.JSX.Element
  AddNewImageButton: ({ postID }: { postID: string | undefined }) => React.JSX.Element
}

const MobileSlider = ({ 
  images,
  addImage,
  postID,
  removeButton,
  onOpen,
  RemoveImageButton,
  AddNewImageButton,
}: MobileProps) => {
  return (
    <div className={`block w-full h-full tablet:hidden overflow-hidden ${addImage && 'pb-14'}`}>
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
          type: 'bullets',
          dynamicBullets: true,
        }}
      >
        {images?.map((item, index) => (
          <SwiperSlide className="rounded-lg" key={index}>
            <Image
              src={item.image || '/img/no-image.png'}
              alt="product image"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={onOpen}
            />

            {
              removeButton && (
                <div className="absolute top-1 right-1">
                  <RemoveImageButton image={item} />
                </div>
              )
            }
          </SwiperSlide>
        ))}

        {!images?.length && (
          <SwiperSlide className="rounded-lg">
            <Image
              src="/img/no-image.png"
              alt="product image"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          </SwiperSlide>
        )}
        <div className="swiper-pagination"></div>
      </Swiper>

      {
        addImage && (
          <div className="block mt-2">
            <AddNewImageButton postID={postID} />
          </div>
        )
      }
    </div>
  )
}

export default MobileSlider
