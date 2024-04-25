'use client'

import React from 'react'

import { useColorMode } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

// import ProfileTitle from '@/components/ProfileTitle'
import { ProductsNotFound } from '@/components/elements/productsNotFound'
import { Loader } from '@/components/ui/Loader'
import { BASE_API_URL } from '@/configs/axios'
import Container from '@/layouts/container'
import { PostTypes } from '@/types/post_types'

const getPostTypes = async (id: string) => {
  const response = await fetch(`${BASE_API_URL}/post_types/${id}/`)

  if (!response.ok) throw new Error('Ошибка')

  return response.json()
}

interface Props {
  params: {
    id: string
  }
}

function Page({ params }: Props) {
  const [isLoading, setIsLoading] = React.useState(true)
  // const [userID, setUserID] = React.useState('')
  const [postTypes, setPostTypes] = React.useState<PostTypes.Item | null>(null)
  const { colorMode } = useColorMode()
  const router = useRouter()

  React.useEffect(() => {
    const userID = Cookies.get('userID') || ''

    if (!userID) router.push('/auth/signin/?isSuccess=false')
    // setUserID(userID)

    getPostTypes(params.id)
      .then(res => setPostTypes(res))

    setIsLoading(false)
  }, [router, params.id])

  if (isLoading) return <Loader />
  return (
    <Container>
      {/* <ProfileTitle userId={userID} profile href="profile" /> */}

      <div className="flex flex-wrap items-center">
        <p className="text-left font-semibold text-base tablet:text-2xl mr-4">
          Акции: {postTypes?.title}
        </p>
      </div>

      {!postTypes?.post_type_posts.length && (
        <ProductsNotFound>
          <div className="flex flex-col items-center">
            <p className="phone:text-xl tablet:text-2xl font-bold py-3 text-center">
              К сожалению ничего не найдено
            </p>
          </div>
        </ProductsNotFound>
      )}

      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 py-[25px] tablet:py-[50px] gap-4">
        {postTypes?.post_type_posts.map(({ id, images_post, name }) => (
          <Image
            src={images_post[0]?.image || '/img/no-product-2.png'}
            alt={name}
            width={250}
            height={300}
            className={twMerge('w-full object-cover h-[300px] rounded-xl', colorMode === 'light' ? 'shadow-[2px_2px_14px_-4px_rgba(0,0,0,0.3)]' : 'shadow-[2px_2px_14px_-4px_rgba(255,255,255,0.7)]')}
            key={id}
          />
        ))}
      </div>
    </Container>
  )
}

export default Page
