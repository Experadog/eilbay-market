'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { VStack, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaCheck } from 'react-icons/fa'

import { PageTitle } from '@/components/elements/PageTitle'
import { Textfield } from '@/components/ui/Textfield'
import axiosRequest from '@/configs/axios'
import { Forms } from '@/helpers/form'
import { useUserStore } from '@/store/useUserStore'
import { UsersTypes } from '@/types/users'

const EmailEdit = ({ user }: { user: UsersTypes.Root }) => {
  const setUser = useUserStore(store => store.setUser)
  const profile = useUserStore(store => store.user)
  const router = useRouter()
  const toast = useToast()

  const {
    handleSubmit,
    register,
    formState: {
      errors,
    },
  } = useForm<{ email: string }>()

  const onSubmit = async (data: { email: string }) => {
    if(user && data.email !== user.email) {
      try {
        await axiosRequest.patch(`/accounts/users/${user.id}/update_email/`, data)
        profile && setUser({ ...profile, ...data }) 
        router.push('/profile/edit/email/success')

        toast({
          title: 'Успех!',
          description: 'Почта успешна изменена!',
          isClosable: true,
          duration: 2500,
        })
      } catch (error) {
        throw error
      }
    } else {
      toast({
        title: 'Ошибка!',
        description: 'Почты совпадают. Введите новую почту!',
        isClosable: true,
        status: 'error',
        duration: 2500,
      })
    }
  }
  
  return (
    <>
      <div className="flex items-center justify-between absolute top-4 tablet:top-10 w-5/6">
        <PageTitle
          leftButton
          rightButton={
            (
            
              <button 
                className="flex items-center gap-2 text-btnBg font-semibold hover:bg-slate-200 px-4 py-2 rounded-md"
                onClick={handleSubmit(onSubmit)}
              ><FaCheck />Готово</button>
            )
          }
        />
      </div>

      <div className="flex justify-center">
        <VStack className="w-[300px] tablet:w-[420px]">
          <div className="flex justify-center items-center">
            <Image
              src="/img/eilbay_logo.svg"
              alt="Eilbay"
              width={25}
              height={30}
            />
            <p className="text-lg tablet:text-2xl font-bold ml-[5px] font-marmelad">Eilbay</p>
          </div>

          <p className="text-[20px] tablet:text-[28px] font-semibold text-center leading-none pb-4 tablet:pb-6">
            Изменение почты
          </p>

          <p
            className="text-sm font-semibold text-[#78828A]"
          >
            Шаг 1 / 1
          </p>

          <Textfield
            type="email"
            label="Почта"
            error={errors.email && errors.email.message}
            placeholder="Введите ваш новый e-mail"
            styles={errors.email && 'placeholder:text-red-500'}
            {...register('email', Forms.Options.Rules.User.Email)}
          />

        </VStack>
      </div>
    </>
  )
}

export default EmailEdit
