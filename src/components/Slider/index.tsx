'use client'

import React from 'react'

import { 
  Button, 
  FormLabel, 
  Image, 
  Input, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader,
  ModalOverlay, 
  useDisclosure, 
} from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FiDownload } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

import { BASE_API_URL } from '@/configs/axios'
import { PostsTypes } from '@/types/posts'

import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import { ZoomImage } from '../ZoomImage'

import MobileSlider from './MobileSlider'
import WebSlider from './WebSlider'

interface SliderProps {
  images: PostsTypes.Image[] | undefined
  removeButton?: boolean
  addImage?: boolean
  postID?: string
}

export default function Slider({ images, removeButton, addImage, postID }: SliderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <WebSlider
        images={images}
        postID={postID}
        onOpen={onOpen}
        addImage={addImage}
        removeButton={removeButton}
        RemoveImageButton={RemoveImageButton}
        AddNewImageButton={AddNewImageButton}
      />
    
      <MobileSlider
        images={images}
        postID={postID}
        onOpen={onOpen}
        addImage={addImage}
        removeButton={removeButton}
        RemoveImageButton={RemoveImageButton}
        AddNewImageButton={AddNewImageButton}
      />

      <ZoomImage 
        images={images}
        isOpen={isOpen} 
        onClose={onClose}
      />
    </>
  )
}

const RemoveImageButton = ({
  image,
}: {
  image: PostsTypes.Image
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const removeImage = async () => {
    setIsLoading(true)

    try {
      await fetch(`/api/posts_images/${image.id}/`, {
        method: 'DELETE',
      })

      router.refresh()
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <>
      <button
        disabled={isLoading}
        className="bg-black/[0.3] w-full rounded-full hover:bg-btnBgHover text-white text-xl p-1"
        onClick={onOpen}
      >
        <IoClose />
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Вы действительно хотите удалить?</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Image
              src={image?.image || '/img/no-image.png'}
              alt="product image"
              width={500}
              height={500}
              className="w-[500px] h-[400px] shadow-md rounded-[12px] object-cover"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={removeImage}
              variant="ghost"
              isLoading={isLoading}
              className="bg-btnBg hover:bg-btnBgHover text-white"
            >
              Удалить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const AddNewImageButton = ({ postID }: { postID: string | undefined }) => {
  const [images, setImages] = React.useState<File[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const removeImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
  }

  const addImage = () => {
    images.forEach(async (item) => {
      setIsLoading(true)

      const formData = new FormData()

      formData.append('image', item)
      formData.append('post', String(postID))

      try {
        await fetch(`${BASE_API_URL}/posts_images/`, {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${Cookies.get('accessToken')}`,
          },
          body: formData,
        })

        router.refresh()
      } catch (error: any) {
        console.error(error.message)
      } finally {
        setIsLoading(false)
        onClose()
      }
    })
  }

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const images = Array.from(event.target.files)

      setImages(images)

      onOpen()
    }
  }

  return (
    <>
      <FormLabel className="w-full">
        <div
          className="flex items-center justify-center bg-black/[0.3] rounded-md hover:bg-btnBgHover text-white text-center py-3 text-base cursor-pointer font-semibold"
        >
          Загрузить <FiDownload className="text-2xl" />
        </div>

        <Input
          multiple
          type="file"
          className="hidden"
          onChange={handleImagesChange}
        />
      </FormLabel>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Хотите добавить?</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
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
              onClick={addImage}
              variant="ghost"
              isLoading={isLoading}
              className="bg-btnBg hover:bg-btnBgHover text-white"
            >
              Добавить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
