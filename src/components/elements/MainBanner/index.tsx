'use client'

import React from 'react'

import Image from 'next/image'
import { Pagination, Autoplay, Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { BannerTypes } from '@/types/banners'

import 'swiper/css'
import 'swiper/css/pagination'
import './banner.css'

export default function Banner({ banners }: { banners: BannerTypes.Item[] }) {
  if (!banners.length) {
    return (
      <div className="w-[100%] phone:h-[30vh] tablet:h-[40vh] pb-6">
        <Image
          src="/img/empty_banner.avif"
          alt="empty_banner"
          width={1000}
          height={1000}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    )
  }

  return (
    <div className="w-[100%] phone:h-[218px] tablet:h-60">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
          type: 'bullets',
        }}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        autoplay={{ delay: 2000 }}
        speed={1000}
        className="mySwiper rounded-xl overflow-hidden"
      >
        {banners?.map(({ id, image }) => (
          <SwiperSlide key={id}>
            <Image
              className=""
              src={image}
              width={1000}
              height={1000}
              alt="banner"
              key={id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
