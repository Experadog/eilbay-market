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
  ModalHeader, 
  ModalOverlay,
  Textarea,
  useColorMode,
  useToast, 
} from '@chakra-ui/react'

import axiosRequest from '@/configs/axios'
import { Forms } from '@/helpers/form'
import { QuestionsTypes } from '@/types/questions'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ComplaintForm = ({
  isOpen,
  onClose,
}: Props) => {
  const { colorMode } = useColorMode()
  const toast = useToast()
  const {
    handleSubmit,
    register,
    reset,
    formState: {
      errors,
    },
  } = useForm<QuestionsTypes.Item>()

  const onSubmit = async (data: QuestionsTypes.Item) => {
    try {
      const { status } = await axiosRequest.post('/settings/question/', data)

      if(status >= 200 && status < 300) {
        reset()
        onClose()

        toast({
          title: 'Отправлено!',
          status: 'success',
          isClosable: true,
        })
      }
    } catch(error) {
      toast({
        title: 'Что-то пошло не так!',
        status: 'error',
        isClosable: true,
      })
    }
  }

  const onCloseModal = () => {
    onClose()
    reset()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onCloseModal} 
      isCentered
      size={'md'}
    >
      <ModalOverlay />
      <ModalContent className="text-center rounded-3xl p-4">
        <ModalHeader className="text-xl">
          Оставьте жалобу или предложение
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-6">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Имя</FormLabel>
            <Input
              placeholder="Введите ваше имя"
              variant={`${colorMode !== 'light' || 'filled'}`}
              className="rounded-full py-[22px] bg-[#f3f3f3] placeholder:text-[#78828A] text-black"
              {...register('name', Forms.Options.Rules.User.Username)}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Почта</FormLabel>
            <Input
              placeholder="Введите ваш e-mail"
              variant={`${colorMode !== 'light' || 'filled'}`}
              className="rounded-full py-[22px] bg-[#f3f3f3] placeholder:text-[#78828A] text-black"
              {...register('email', Forms.Options.Rules.User.Email)}
              maxLength={52}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone_number}>
            <FormLabel>Телефон</FormLabel>
            <Input
              placeholder="Введите ваш телефон (+996*********)"
              variant={`${colorMode !== 'light' || 'filled'}`}
              className="rounded-full py-[22px] bg-[#f3f3f3] placeholder:text-[#78828A] text-black"
              {...register('phone_number', Forms.Options.Rules.User.Phone)}
              maxLength={13}
            />
            <FormErrorMessage>
              {errors.phone_number && errors.phone_number.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.question}>
            <FormLabel>Жалоба или предложение</FormLabel>
            <Textarea 
              placeholder="Введите текст"
              variant={`${colorMode !== 'light' || 'filled'}`}
              {...register('question', Forms.Options.Rules.Complaint.Questions)}
              rows={7}
              resize={'none'}
              maxLength={300}
              className="rounded-3xl py-[12px] bg-[#f3f3f3] placeholder:text-[#78828A] text-black"
            ></Textarea>
            <FormErrorMessage>
              {errors.question && errors.question.message}
            </FormErrorMessage>
          </FormControl>

          <Button 
            py={6}
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-[#58A6DF] text-[#FFFFFF] rounded-full"
          >
            Отправить
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
