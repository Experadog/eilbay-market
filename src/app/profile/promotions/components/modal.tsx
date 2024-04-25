'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { BiPlusCircle } from 'react-icons/bi'

import axiosRequest from '@/configs/axios'

const createNewPostTypes = async (title: string, owner: string) => {
  await axiosRequest.post('/post_types/', {
    title,
    owner,
  })
}

interface Props {
  owner: string
}

export default function ModalWindow({ owner }: Props) {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const toast = useToast()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: {
      errors,
    },
    reset,
  } = useForm<{ title: string }>()

  const onSubmit = async ({ title }: { title: string }) => {
    try {
      await createNewPostTypes(title, owner)

      toast({
        title: `${title}, создан!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      })

      onClose()
      router.refresh()

      reset({
        title: '',
      })
    } catch (error) {
      throw new Error('Ошибка при создании акции магазина')
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="p-0 tablet:text-2xl phone:text-lg"
        variant="unstyled"
      >
        <BiPlusCircle />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Новая акция</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel>
                Акция:
              </FormLabel>

              <Input
                placeholder="Название акции"
                {...register('title', { required: 'Обязательно!' })}
              />

              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              className="bg-btnBg hover:bg-btnBgHover text-white px-3 py-2 h-auto"
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >Добавить</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
