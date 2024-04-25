'use client'

import React from 'react'

import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { MiniProduct } from '@/components/ui/MiniProduct'
import { PostsTypes } from '@/types/posts'

interface Props {
  similarPosts: PostsTypes.Response
}

export default function SimilarPostsSlider({ similarPosts }: Props) {

  const breakPoints = {
    320: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1150: {
      slidesPerView: 5,
    },
  }

  return (
    <>
      <Swiper
        breakpoints={breakPoints}
        spaceBetween={10}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        className="w-full"
      >
        {
          similarPosts.results.map((item) => (
            <SwiperSlide
              key={item.id}
              className="rounded-2xl overflow-hidden border-[1px] border-[#3D424A33] shadow-lg"
            >
              <MiniProduct {...item} />
            </SwiperSlide>
          ),
          )
        }
      </Swiper>
    </>
  )
}
