import React from 'react'

import Image from 'next/image'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'

import { PostsTypes } from '@/types/posts'

import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

interface WebProps {
  images: PostsTypes.Image[] | undefined
  removeButton?: boolean
  addImage?: boolean
  postID?: string
  onOpen: () => void
  RemoveImageButton: ({ image }: { image: PostsTypes.Image }) => React.JSX.Element
  AddNewImageButton: ({ postID }: { postID: string | undefined }) => React.JSX.Element
}

const WebSlider = ({ 
  images,
  removeButton,
  addImage,
  postID,
  onOpen,
  RemoveImageButton,
  AddNewImageButton,
}: WebProps) => {
  const [selectedImage, setSelectedImage] = React.useState<PostsTypes.Image | null>(null)

  React.useEffect(() => {
    setSelectedImage(images?.length ? images[0] : null)
  }, [images])

  return (
    <>
      <div className="h-full w-1/3 hidden tablet:block">
        <Swiper
          className="w-[100px] h-[250px] tablet:h-full tablet:w-[100%]"
          style={{ margin: '0' }}
          modules={[Navigation, Pagination, A11y, Autoplay]}
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={10}
          direction="vertical"
          autoplay={{ delay: 2000 }}
          speed={1000}
        >
          {images?.map((item, index) => (
            <SwiperSlide className="rounded-lg" key={index}>
              <Image
                src={item.image || '/img/no-image.png'}
                alt="product image"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg cursor-pointer shadow-md border-[1px] border-gray-100 border-solid"
                onClick={() => setSelectedImage(item)}
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
                className="w-full h-full object-cover rounded-lg cursor-pointer shadow-md border-[1px] border-gray-100 border-solid"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      <div className="h-full w-2/3 relative hidden tablet:block">
        <Image 
          src={selectedImage?.image || '/img/no-image.png'}
          alt="product"
          width={500}
          height={500}
          className="object-cover h-full w-full rounded-lg cursor-pointer shadow-md border-[1px] border-gray-100 border-solid"
          onClick={onOpen}
        />

        {
          addImage &&  (
            <div className="w-2/3 space-y-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <AddNewImageButton
                postID={postID}
              />
            </div>
          )
        }
      </div>
    </>
  )
}

export default WebSlider
