'use client'
import React from 'react'

import { GridItem, useColorMode } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { TbCirclePlus } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'

import { ProductsNotFound } from '@/components/elements/productsNotFound'
import { Loader } from '@/components/ui/Loader'
import { Product } from '@/components/ui/Product'
import { BASE_API_URL } from '@/configs/axios'
import Container from '@/layouts/container'
import { PostTypes } from '@/types/post_types'

interface Props {
  params: {
    id: string
  }
}

const Page: React.FC<Props> = ({ params }) => {
  const [isPageLoading, setIsPageLoading] = React.useState(true)
  const [userID, setUserID] = React.useState('')
  const [posts, setPosts] = React.useState<PostTypes.Item | undefined>(undefined)
  const [postTypes, setPostTypes] = React.useState<PostTypes.Reponse>()
  const { colorMode } = useColorMode()

  const getPostTypes = async (owner: string) => {
    const res = await fetch(`${BASE_API_URL}/post_types/?owner=${owner}`)
    return res.json()
  }

  const getPosts = async (id: string) => {
    const res = await fetch(`${BASE_API_URL}/post_types/${id}/`)
    return res.json()
  }

  const getData = React.useCallback(async () => {
    try {
      const [postTypesResponse, postsResponse] = await Promise.all([
        getPostTypes(userID),
        getPosts(params.id),
      ])
      setPosts(postsResponse)
      setPostTypes(postTypesResponse)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    } finally {
      setIsPageLoading(false)
    }
  }, [params.id, userID])

  React.useEffect(() => {
    setUserID(Cookies.get('userID') || '')
    getData()
  }, [getData])

  if (isPageLoading) return <Loader />
  return (
    <Container>
      <div className="flex items-center relative py-6">
        <Link
          href="/profile/promotions"
          className="opacity-50 flex items-center text-[14px] tablet:text-[16px]"
        >
          <FaArrowLeftLong className="text-2xl mr-2 w-[18px] tablet:w-[24px]" /> Назад
        </Link>

        <p className="font-medium text-[18px] pl-[15px] tablet:p-0 tablet:text-[22px] text-center absolute left-1/2 -translate-x-1/2">
          Редактирование страницы
        </p>
      </div>

      <div className="flex py-6 justify-center gap-[40px] tablet:gap-0 tablet:justify-between">
        <div className="flex flex-col items-center gap-2 tablet:flex-row">
          {postTypes?.results.map(({ id, title }) => (
            <Link
              key={id}
              href={`/profile/promotions/edit/${id}`}
              className={`px-6 font-semibold text-[14px] tablet:text-[14px] laptop:text-[18px] ${+params.id === id && 'border-b-2 border-[#58A6DF]'}`}
            >
              {title}
            </Link>
          ))}

          <Link
            href="/profile/promotions/edit/banner"
            className={'px-6 font-semibold text-[14px] tablet:text-[14px] laptop:text-[18px]'}
          >
            Рекламный постер
          </Link>
        </div>

        <div className="flex items-center">
          <Link href="/catalog/product">
            <TbCirclePlus className="text-2xl" />
          </Link>
        </div>
      </div>

      {!posts?.post_type_posts.length && (
        <ProductsNotFound>
          <div className="flex flex-col items-center">
            <p className="phone:text-[20px] tablet:text-[25px] font-bold py-3 text-center">
              К сожалению ничего не найдено
            </p>
          </div>
        </ProductsNotFound>
      )}

      <div className="grid grid-cols-2 phone:gap-x-2 phone:gap-y-4 laptop:gap-x-4 laptop:grid-cols-3 desktop:grid-cols-4 py-5 ">
        {posts?.post_type_posts.map((post) => (
          <GridItem
            key={post.id}
            className={twMerge('rounded-xl overflow-hidden relative shadow-[0_0_19px_-0_rgba(61,66,74,0.20)]', colorMode === 'dark' && 'shadow-slate-700')}
          >
            <Product {...post} />
          </GridItem>
        ))}
      </div>
    </Container>
  )
}

export default Page
