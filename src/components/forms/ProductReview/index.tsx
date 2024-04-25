'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { InputRightElement } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { CgArrowRightO } from 'react-icons/cg'
import { MdOutlineStar } from 'react-icons/md'

import { Textfield } from '@/components/ui/Textfield'
import { BASE_API_URL } from '@/configs/axios'
import { Forms } from '@/helpers/form'

interface Props {
  post_id: string
}

export const ProductReview = ({ post_id }: Props) => {
  const [stars, setStars] = React.useState(0)
  const [starsMessage, setStarsMessage] = React.useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<{
    review: string
  }>()

  const onSubmit = async ({ review }: { review: string }) => {
    if(stars) {
      try {
        (await fetch(`${BASE_API_URL}/reviews/`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
          },
          body: JSON.stringify({
            review,
            post: post_id,
            stars,
          }),
        })).json()

        setStars(0)
        setStarsMessage('')
        reset({
          review: '',
        })

        router.refresh()
      } catch (error) {
        throw new Error('error')
      }
    } else {
      setStarsMessage('Поставьте оценку!')
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <div>
      <div>
        <p className="font-medium">Оцените покупку</p>
        <div className="flex items-center gap-5 mt-[5px]">
          <div className="flex items-center gap-2">
            {
              Array.from({ length: 5 }).map((_, index) => (
                <MdOutlineStar
                  key={index} 
                  className={`text-[42px] cursor-pointer ${index + 1  <= stars ? 'text-[#FFA800]' : 'text-[#EAE8EB]'}`}
                  onClick={() => setStars(index + 1)}
                />
              ))
            }
          </div>

          <p className="text-red-500">{starsMessage}</p>
        </div>
      </div>

      <div className="my-[15px]">
        <Textfield 
          label="Напишите свой отзыв"
          error={errors.review && errors.review.message}
          placeholder="Введите"
          onKeyDown={handleKeyUp}
          {...register('review', Forms.Options.Rules.Post.Review )}
          rightElement={
            <InputRightElement className="cursor-pointer" onClick={handleSubmit(onSubmit)}>
              <CgArrowRightO
                width={1000}
                height={1000}
                className="text-xl text-black bg-[#EAE8EB]"
              />
            </InputRightElement>
          }
        />
      </div>
    </div>
  )
}
