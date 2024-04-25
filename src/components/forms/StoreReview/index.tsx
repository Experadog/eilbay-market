'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { MdOutlineStar } from 'react-icons/md'

import { TextAreafield } from '@/components/ui/TextAreafield'
import { BASE_API_URL } from '@/configs/axios'
import { Forms } from '@/helpers/form'

interface Props {
  shop: string
}

export const StoreReview = ({ shop }: Props) => {
  const [stars, setStars] = React.useState(0)
  const [starsMessage, setStarsMessage] = React.useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset,
  } = useForm<{ review: string }>()

  const onSubmit = async ({ review }: { review: string }) => {
    if (!stars) return setStarsMessage('Поставьте оценку!')

    try {
      await fetch(`${BASE_API_URL}/store_reviews/?shop=${shop}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
        body: JSON.stringify({ review, shop, stars }),
      })

      setStars(0)
      setStarsMessage('')
      reset({
        review: '',
      })

      router.refresh()
    } catch (error: any) {
      throw new Error(error.statusText)
    }
  }

  return (
    <div className="flex flex-col space-y-4 pb-4">
      <div className="">
        <p className="text-base tablet:text-xl font-medium">Оцените магазин</p>
        <div className="flex items-center">
          <div className="flex items-center">
            {
              Array.from({ length: 5 }).map((_, index) => (
                <MdOutlineStar
                  key={index}
                  className={`text-[42px] cursor-pointer ${index + 1 <= stars ? 'text-[#FFA800]' : 'text-[#EAE8EB]'}`}
                  onClick={() => setStars(index + 1)}
                />
              ))
            }
          </div>

          <p className="text-red-500">{starsMessage}</p>
        </div>
      </div>

      <TextAreafield
        label="Напишите свой отзыв"
        placeholder="Введите"
        error={errors.review && errors.review.message}
        rows={5}
        {...register('review', Forms.Options.Rules.Post.Review)}
      />

      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="mr-auto text-[14px] tablet:text-[16px] bg-btnBg hover:bg-btnBgHover text-[#fff] rounded-[30px]"
      >
        Отправить отзыв
      </Button>
    </div>
  )
}
