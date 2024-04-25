'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import CategoryModal from '@/components/ui/CategoryModal'
import { Selectfield } from '@/components/ui/Selectfield'
import { TextAreafield } from '@/components/ui/TextAreafield'
import { Textfield } from '@/components/ui/Textfield'
import { BASE_API_URL } from '@/configs/axios'
import { Forms } from '@/helpers/form'
import { CategoriesTypes } from '@/types/categories'
import { PostTypes } from '@/types/post_types'
import { PostsTypes } from '@/types/posts'

import { CreateImage } from '../CreateImage'

interface Props {
  postTypes: PostTypes.Reponse
  categories: CategoriesTypes.Item[]
}

export const ProductCreate = ({ categories, postTypes }: Props) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<CategoriesTypes.Item>()
  const [selectedCategories, setSelectedCategories] = React.useState<CategoriesTypes.Item[]>([])
  const [uploadedImages, setUploadedImages] = React.useState<File[]>([])

  const router = useRouter()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<PostsTypes.Item>()

  const onCreateImages = (postID: string) => {
    uploadedImages.forEach(async item => {
      const formData = new FormData()

      formData.append('post', String(postID))
      formData.append('image', item)

      try {
        await fetch(`${BASE_API_URL}/posts_images/`, {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${Cookies.get('accessToken')}`,
          },
          body: formData,
        })

        router.push('/profile/view')
      } catch (error: any) {
        console.error('Error', error)
      } finally {
        setTimeout(() => setIsFetching(false), 1000)
      }
    })
  }

  const onCreatePost = async (data: PostsTypes.Item) => {
    if (!uploadedImages?.length) {
      return toast({
        title: 'Загрузите хотя-бы 1 фото',
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'bottom',
      })
    }

    setIsFetching(true)

    try {
      const res: { id: string } = await (await fetch(`${BASE_API_URL}/posts/`, {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${Cookies.get('accessToken')}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          category: selectedCategory?.id,
        }),
      })).json()

      onCreateImages(res.id)

      toast({
        title: 'Товар создан успешно!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      console.error('Error', error)
    }
  }

  return (
    <div className="flex phone:flex-col laptop:flex-row">
      <CreateImage setUploadedImages={setUploadedImages} uploadedImages={uploadedImages} />

      <div className="flex flex-col basis-80 flex-1 tablet:pl-4 space-y-4">
        <div className="flex flex-col">
          <p className="text-[15px] font-medium">Выберите нужную категорию</p>

          <div className="flex justify-between">
            {!!selectedCategories.length && (
              <div className="flex flex-wrap">
                <p className="capitalize">{selectedCategories.map(category => category.name).join(' > ').toLowerCase()}</p>
              </div>
            )}

            <div>
              <CategoryModal
                setSelectedCategories={setSelectedCategories}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                selectedCategories={selectedCategories}
              />
            </div>
          </div>
        </div>

        {
          !!postTypes?.count && (
            <Selectfield
              label="Акция"
              placeholder="Выберите нужную акцию"
              {...register('post_type')}
            >
              {postTypes.results.map(({ id, title }) => (
                <option
                  className="bg-[#f3f3f3]"
                  value={id}
                  key={id}
                >{title}</option>
              ))}
            </Selectfield>
          )
        }

        <Textfield
          label="Наименование"
          placeholder="Введите наименование (максимум 80 символов)"
          error={errors.name && errors.name.message}
          {...register('name', Forms.Options.Rules.Post.Name)}
        />

        <TextAreafield
          label="Описание"
          rows={6}
          error={errors.description && errors.description.message}
          placeholder="Описание (максимум 800 символов)"
          {...register('description', Forms.Options.Rules.Post.Description)}
        />

        <div>
          <Textfield
            label="Цена"
            placeholder="Цена (валюта $$$) (максимум 10 символов)"
            error={errors.price && errors.price.message}
            {...register('price', Forms.Options.Rules.Post.Price)}
          />

          <p className="text-[12px] font-normal">
            Цена товара указать в долларах США
          </p>
        </div>

        <Button
          colorScheme="linkedin"
          className="w-full rounded-[30px] tablet:py-[25px] mt-[30px] bg-btnBg hover:bg-btnBgHover text-white"
          type="submit"
          isLoading={isFetching}
          onClick={handleSubmit(onCreatePost)}
        >
          Добавить
        </Button>
      </div>
    </div>
  )
}
