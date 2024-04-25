'use client'

import React from 'react'
import { FieldError, useForm } from 'react-hook-form'

import { Button } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FaCheck } from 'react-icons/fa6'

import { PageTitle } from '@/components/elements/PageTitle'
import { Selectfield } from '@/components/ui/Selectfield'
import { TextAreafield } from '@/components/ui/TextAreafield'
import { Textfield } from '@/components/ui/Textfield'
import { BASE_API_URL } from '@/configs/axios'
// import { SocialsTypes } from '@/types/socials'
import { Forms } from '@/helpers/form'
import { UsersTypes } from '@/types/users'

import { ImageEdit } from './ImageEdit'

interface Props {
  user: UsersTypes.Root
  // social_types: SocialsTypes.Response
}

export const UserEdit = ({
  user,
  // social_types,
}: Props) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    setError,
  } = useForm<UsersTypes.Root>()

  const onSubmit = async (data: any) => {
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] == null) {
        delete data[key]
      }
    })

    try {
      const response = await fetch(`${BASE_API_URL}/accounts/users/${user.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/profile/view')
      }

      if (!response.ok) {
        const error = await response.json()

        if (error.username) {
          setError('username', {
            type: 'manual',
            message: error.username[0],
          })
        }
      }
    } catch (error: any) {
      console.error('error', error)
    } 
  }

  return (
    <>
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

      <div className="flex flex-wrap justify-center">
        <ImageEdit user={user} />

        <div className="flex flex-col grow basis-[420px] gap-y-6 mt-6 laptop:mt-0">
          <div className="flex flex-col grow basis-[420px] gap-y-6 mt-6 laptop:mt-0">
            <Textfield
              label="Имя"
              error={errors.username && (errors.username as FieldError).message}
              placeholder="Введите имя компании"
              {...register('username', {
                ...Forms.Options.Rules.User.Username,
                required: false,
              })}
              maxLength={30}
            />

            <TextAreafield
              label="Описание"
              placeholder="О компании"
              maxLength={300}
              error={errors.description && (errors.description as FieldError).message}
              {...register('description', {
                ...Forms.Options.Rules.User.Description,
                required: false,
              })}
              rows={8}
            />

            <Textfield
              label="Номер телефона"
              error={errors.phone_number && (errors.phone_number as FieldError).message}
              placeholder="+996770123456"
              {...register('phone_number', {
                ...Forms.Options.Rules.User.Phone,
                required: false,
              })}
            />

            <Selectfield
              placeholder="Тип пользователя"
              color="#78828A"
              // {...register('user_status.user')}
            >
              {
                ['Производитель', 'Поставщик'].map(item => (
                  <option
                    key={item}
                    className="ml-5"
                  >
                    {item}
                  </option>
                ),
                )
              }
            </Selectfield>

            <div>
              <p className="font-semibold text-xl">Почта</p>

              <div className="flex justify-between py-4 items-center">
                <p className="font-medium text-base">{user?.email}</p>

                <Button
                  colorScheme="blue"
                  className="bg-btnBg hover:bg-btnBgHover text-white"
                  onClick={() => router.push('/profile/edit/email')}
                >
                  Изменить
                </Button>
              </div>
            </div>

            <div>
              <p className="font-semibold text-xl">Пароль</p>

              <div className="flex justify-between py-4 items-center">
                <p className="font-medium text-base">*********</p>

                <Button
                  colorScheme="blue"
                  className="bg-btnBg hover:bg-btnBgHover text-white"
                  onClick={() => router.push('/profile/edit/password')}
                >
                  Изменить
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              className="text-[#58A6DF] border-[#58A6DF] rounded-3xl py-7"
              onClick={() => router.push('/subscribe')}
            >
              Подключить про
            </Button>
          </div>
        </div>
      </div></>
  )
}
