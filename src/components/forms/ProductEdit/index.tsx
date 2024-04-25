'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@chakra-ui/react'
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

import { RemovePostButton } from '../RemovePostButton'

interface Props {
  post: PostsTypes.Root
  categories: CategoriesTypes.Item[]
  postTypes: PostTypes.Reponse
}

export const ProductEdit = ({
  post,
  categories,
  postTypes,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<CategoriesTypes.Item>()
  const [selectedCategories, setSelectedCategories] = React.useState<CategoriesTypes.Item[]>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<PostsTypes.Item>()

  const toast = useToast()
  const router = useRouter()

  const onSubmit = async (data: PostsTypes.Item) => {
    setIsLoading(true)

    try {
      const { status } = await fetch(`${BASE_API_URL}/posts/${data.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
        body: JSON.stringify({
          ...data,
          category: selectedCategory?.id,
        }),
      })

      if (status >= 200 && status < 300) {
        toast({
          title: 'Успешно изменен',
          duration: 2500,
          isClosable: true,
          status: 'info',
        })

        router.push(`/catalog/product/view/${post?.id}`)
      }
    } catch (error) {
      console.error('error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onRemoveButton = async () => {
    try {
      const { status } = await fetch(`/api/posts/${post?.id}`, {
        method: 'DELETE',
      })

      if (status >= 200 && status < 300) {
        toast({
          title: 'Товар успешно удален!',
          duration: 2500,
          isClosable: true,
          status: 'info',
        })

        router.push('/profile/view')
      }
    } catch (err) {
      toast({
        title: 'Произошла ошибка при удалении',
        duration: 2500,
        isClosable: true,
        status: 'error',
      })
    }
  }

  React.useEffect(() => {
    reset({
      id: post.id,
      category: post.category,
      post_type: post.post_type,
      name: post.name,
      description: post.description,
      price: post.price,
    })
  }, [post, reset])

  return (
    <div className="flex flex-col flex-1 gap-y-5 laptop:pl-6">
      <div className="flex flex-col">
        <p className="text-[15px] font-medium">Выберите нужную категорию</p>

        <div className="flex justify-between">
          <div className="flex flex-wrap">
            <p className="capitalize">{selectedCategories.map(category => category.name).join(' > ').toLowerCase()}</p>
          </div>

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

      {!!postTypes?.count && (
        <Selectfield
          label="Акция"
        >
          <option value="">Нет</option>
          {postTypes.results.map(({ id, title }) => (
            <option
              key={id}
            >
              {title}
            </option>
          ))}
        </Selectfield>
      )}

      <Textfield
        label="Наименование"
        placeholder="Введите наименование (максимум 80 символов)"
        error={errors.name && errors.name.message}
        maxLength={80}
        {...register('name', Forms.Options.Rules.Post.Name)}
      />

      <TextAreafield
        label="Описание"
        placeholder="Описание (максимум 800 символов)"
        maxLength={800}
        rows={6}
        error={errors.description && errors.description.message}
        {...register('description', Forms.Options.Rules.Post.Description)}
      />

      <Textfield
        type="number"
        label="Цена"
        placeholder="Цена (валюта $$$) (максимум 10 символов)"
        error={errors.price && errors.price.message}
        {...register('price', { required: Forms.Options.required })}
      />

      <p className="text-[12px] font-normal">
        Цена товара указана в долларах США
      </p>

      <div className="flex text-white gap-5">
        <RemovePostButton onRemoveButton={onRemoveButton} isLoading={isLoading} />

        <button
          className="w-3/5 font-semibold rounded-[30px] mt-[30px] bg-btnBg hover:bg-btnBgHover tablet:py-3"
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}
