import React from 'react'

import { 
  Avatar,
  Button,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'

import { ModalWindow } from '@/components/ui/Modal'
import { BASE_API_URL } from '@/configs/axios'
import { UsersTypes } from '@/types/users'

interface Props {
  user: UsersTypes.Root
}

export const ImageEdit = ({
  user,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState<File>()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const router = useRouter()

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = { ...event.target.files }
    setSelectedImage(images[0])
    onOpen()
  }

  const onUpdateImage = async () => {
    setIsLoading(true)

    if (selectedImage) {
      try {
        const formData = new FormData()

        formData.append('image', selectedImage)

        const response = await fetch(`${BASE_API_URL}/accounts/users/${user.id}/`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
          },
          body:formData,
        })

        if(response.ok) {
          router.push('/profile/view')
          router.refresh()
          setIsLoading(false)
        }
      } catch (error: any) {
        console.error('error', error)
      } finally {
        onClose()
      }
    }
  }

  return (
    <div className="flex flex-col items-center grow-0 basis-[420px] space-y-4 mt-7">
      <Avatar
        src={`http://eilbay.com${user.image}`}
        size="2xl"
        className="w-60 h-60 border-2 border-[#F0F0F0]"
      />

      <ButtonGroup>
        <label>
          <div className="flex bg-slate-100 hover:bg-slate-200 font-semibold px-4 py-2 rounded-md items-center cursor-pointer text-[#465058]">
            Загрузить

            <FaDownload className="ml-2" />
          </div>

          <input
            type="file"
            className="hidden"
            onChange={handleChangeImage}
          />
        </label>

        <RemoveButton user={user} />
      </ButtonGroup>

      <ModalWindow
        isOpen={isOpen}
        onClose={onClose}
        onAction={onUpdateImage}
        header="Сохранить картинку?"
        isLoading={isLoading}
      >
        {selectedImage && (
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt=""
            width={500}
            height={500}
          />
        )}
      </ModalWindow>
    </div>
  )
}

const RemoveButton = ({ user }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const router = useRouter()

  const onRemoveImage = async () => {
    setIsLoading(true)

    try {
      const formData = new FormData()

      formData.append('image', '')
        
      const response = await fetch(`${BASE_API_URL}/accounts/users/${user.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
        body: formData,
      })

      if(response.ok) {
        router.push('/profile/view')
        router.refresh()
        setIsLoading(false)
      }
    } catch (error: any) {
      console.error('error', error)
    } finally {
      onClose()
    }
  }

  return (
    <>
      <Button
        className="text-[#465058] bg-slate-100 hover:bg-slate-200"
        rightIcon={<FaRegTrashAlt />}
        isDisabled={!user.image}
        onClick={onOpen}
      >
        Удалить
      </Button>

      <ModalWindow
        isOpen={isOpen}
        onClose={onClose}
        onAction={onRemoveImage}
        header="Удаление картинки"
        isLoading={isLoading}
        remove
      >
        Вы действительно хотите удалить?
      </ModalWindow></>
  )
}
