import React from 'react'

import { useDisclosure, Button, Modal, Input, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, FormLabel } from '@chakra-ui/react'
import Image from 'next/image'
import { FiDownload } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

interface Props {
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>
  uploadedImages: File[]
}

export const CreateImage = ({ setUploadedImages, uploadedImages }: Props) => {
  const [selectedImage, setSelectedImage] = React.useState<File>()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleInputImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const images = Array.from(event.target.files)

      setSelectedImage(images[0])
      setUploadedImages(images)
      onOpen()
    }
  }

  const removeImage = (index: number) => {
    const updatedImages = [...uploadedImages]
    updatedImages.splice(index, 1)
    setUploadedImages(updatedImages)
  }

  return (
    <>
      <div className="flex basis-80 flex-1 space-x-3 max-h-[500px] pb-8">
        <Swiper
          className="grow-[1] h-full w-40"
          style={{ margin: '0' }}
          modules={[Navigation, Pagination, A11y, Autoplay]}
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={10}
          direction="vertical"
          autoplay={{ delay: 2000 }}
          speed={1000}
          loop={true}
        >
          {uploadedImages.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <Image
                  src={URL.createObjectURL(item)}
                  alt="product image"
                  width={150}
                  height={150}
                  className="object-cover cursor-pointer rounded-lg shadow-md border-[1px] border-gray-100 border-solid"
                  onClick={() => setSelectedImage(item)}
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 text-white bg-black/[0.3] rounded-full p-1 hover:bg-btnBgHover"
                >
                  <IoClose />
                </button>
              </div>
            </SwiperSlide>
          ))}

          {!uploadedImages.length && (
            <SwiperSlide>
              <Image
                src="/img/no-image.png"
                alt="product image"
                width={150}
                height={150}
                className="object-cover cursor-pointer rounded-lg"
              />
            </SwiperSlide>
          )}
        </Swiper>

        <div className="relative h-full grow-[4]">
          <Image
            src={selectedImage ? URL.createObjectURL(selectedImage) : '/img/no-image.png'}
            alt="product image"
            width={445}
            height={470}
            className="h-full object-cover rounded-lg shadow-md border-[1px] border-gray-100 border-solid"
          />

          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <FormLabel>
              <div
                className="flex items-center justify-center bg-black/[0.3] rounded-md hover:bg-btnBgHover text-white text-center py-2 px-4 text-base cursor-pointer font-semibold"
              >
                Загрузить <FiDownload className="text-2xl" />
              </div>

              <Input
                multiple
                type="file"
                className="hidden"
                onChange={handleInputImageChange}
              />
            </FormLabel>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Подтвердите выбранные фотографии</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <div className="flex flex-wrap gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="product img"
                    width={500}
                    height={500}
                    className="flex-1 basis-[150px] h-[200px] shadow-md rounded-[12px] object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 text-white bg-black/[0.3] rounded-full p-1 hover:bg-btnBgHover"
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onClose}
              className="bg-btnBg hover:bg-btnBgHover text-white"
            >
              Подтвердить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal></>
  )
}
