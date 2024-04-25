'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useColorMode,
} from '@chakra-ui/react'
import { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

import { Textfield } from '@/components/ui/Textfield'
import axiosRequest from '@/configs/axios'
import { Forms } from '@/helpers/form'
import Container from '@/layouts/container'
import { UsersTypes } from '@/types/users'

const validateUserName = (value: string) => {
  if (/^[A-Z]/.test(value)) {
    return 'Имя должно содержать только латинские буквы, не более 30. Например: melisovich'
  }

  if (!/^[a-z]/.test(value)) {
    return 'Имя должно содержать только латинские буквы, не более 30. Например: melisovich'
  }

  if (value.includes(' ')) {
    return 'Для указания пробела используется символ "_" Например: ivanov_kiril'
  }

  if (!/^[a-z0-9_]+$/.test(value)) {
    return 'Имя не должно начинаться с цифры!'
  }

  return true
}

export default function Page() {
  const [responseErrors, setResposeErrors] = React.useState<{ [x: string]: any }>({})
  const [isFetching, setIsFetching] = React.useState(false)

  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    getValues,
  } = useForm<UsersTypes.Form>()

  const onSubmit = async (data: UsersTypes.Form) => {
    setIsFetching(true)

    try {
      await axiosRequest.post<UsersTypes.Item>('/accounts/users/', data)
      
      router.push('/auth/signup/verify')
    } catch (e) {
      const { response } = e as AxiosError<{ username: any, email: any }>
      
      if (response?.data) {
        const username = response.data.username[0]
        const email = response.data.email[0]

        setResposeErrors({ username, email })
      }
    } finally {
      setTimeout(() => setIsFetching(false), 500)
    }
  }

  return (
    <Container>
      <div className="flex justify-center">
        <div className="flex flex-col phone:w-[95%] tablet:w-[490px] space-y-5">
          <div className="flex justify-center items-center">
            <Image
              src="/img/eilbay_logo.svg"
              alt="Eilbay"
              width={25}
              height={30}
            />
            <p className="text-2xl font-medium ml-1 font-marmelad">Eilbay</p>
          </div>

          <p className="text-3xl text-center pb-6 font-medium">
            Добро пожаловать!
          </p>

          <p className="text-sm font-semibold text-center">
            Шаг 1 / 2
          </p>

          <div className="relative">
            <div className="absolute -right-2 -top-2">
              <Popover>
                <PopoverTrigger>
                  <Button variant="ghost" colorScheme="white" className="rounded-full p-0">
                    <AiOutlineQuestionCircle className="text-xl" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <ul className="px-2 list-none">
                      <li className="font-semibold">Примечания!</li>
                      <ul className="list-inside list-disc">
                        <li>Логин должен использовать только латинские буквы.</li>
                        <li>Начинаться с буквы.</li>
                        <li>Допускаются цифры и использование символа <span>&quot;_&quot;</span> вместо пробела.</li>
                        <li>Но не должен включать спецсимволы.</li>
                      </ul>
                    </ul>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </div>

            <Textfield
              label="Имя"
              placeholder="Введите ваше имя"
              error={errors.username && errors.username.message || responseErrors.username && 'Пользователь уже существует!'}
              {...register('username', {
                ...Forms.Options.Rules.User.Username,
                onChange: () => setResposeErrors(state => ({ ...state, username: '' })),
                validate: validateUserName,
              })}
            />
          </div>

          <Textfield
            label="Почта"
            placeholder="Введите ваш e-mail"
            type="email"
            error={errors.email && errors.email.message || responseErrors.email && 'Почта уже существует!'}
            {...register('email', {
              ...Forms.Options.Rules.User.Email,
              onChange: () => setResposeErrors(state => ({ ...state, email: '' })),
            })}
          />

          <Textfield
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
            error={errors.password && errors.password.message}
            {...register('password', Forms.Options.Rules.User.Password)}
          />

          <Textfield
            label="Повторите Ваш пароль"
            placeholder="Повторите пароль"
            type="password"
            error={errors.confirm_password && errors.confirm_password.message}
            {...register('confirm_password', {
              required: Forms.Options.required,
              validate: {
                match: value => getValues().password === value || 'Пароль не совпадает',
              },
            })}
          />

          <Button
            className="bg-btnBg hover:bg-btnBgHover text-white rounded-full h-11"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            isLoading={isFetching}
          >
            Зарегистрироваться
          </Button>

          <Link
            href="/auth/signin"
            className="text-slate-400 text-sm font-semibold text-right"
          >
            Уже есть аккаунт? Войти
          </Link>

          <Flex className="items-start" alignItems="start" mb="4">
            <Checkbox
              size="lg"
              isInvalid={!!errors.is_agree}
              {...register('is_agree', { required: true })}
              className={twMerge(colorMode === 'light' ? 'border-slate-400' : 'border-white')}
            />
            <Text className={twMerge('ml-2 text-sm font-medium', errors.is_agree && 'text-red-500')}>
              Нажимая кнопку Зарегистрироваться, я принимаю условия
              пользовательского соглашения и даю свое согласие на {' '}
              <button
                className="inline cursor-pointer underline text-[#58A6DF]"
                onClick={onOpen}
              >
                обработку моих персональных данных
              </button>.
            </Text>
          </Flex>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Пользовательское соглашение</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            overflowY="scroll"
            maxH="430px"
            marginRight="15px"
            css={{
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-track': {
                width: '10px',
                background: '#D9D9D9',
                borderRadius: '24px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#8B8B8B',
                borderRadius: '24px',
              },
            }}
          >
            <Text
              padding="5px 10px"
              border="1px solid #D9D9D9"
              color="#8B8B8B"
              borderRadius="5px"
              fontWeight="500"
            >
              Пол ьзова тельск ое сог лашение Пользователь ское соглашениеПользо вательское согл ашениеПользо вательское согла шениеП ользовательс кое соглашени еПо льзовательское соглаше ниеПольз овател ьское соглаше ниеПользов а тел ьское соглашени еПользо ва тельское соглаш ениеПольз овательское соглашениеПол ь зовательское  соглашениеП ользова тельс кое соглаше ниеПользователь ское соглашениеПользовательеПользов а тел ьское соглашени еПользо ва тельское соглаш ениеПольз овательское соглашениеПол ь зовательское  соглашениеП ользова тельс кое соглаше ниеПользователь ское соглашениеПользовательское соглашение Пользо  вательс кое согл ашени е Пользовате льское соглашениеПользовательское соглашение
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}
